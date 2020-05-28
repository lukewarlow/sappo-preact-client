import MessageBox from "./messages/message-box";
import SendMessageModal from "./messages/send-species-message-modal";
import Toast from "./toast";
import { onNewMessage, onUserConnects, onUserDisconnects } from "../Socket";
import { emptyMessage, Message, MessagesApi } from "../api/MessagesApi";
import { countNumberOfUniqueSpecies } from "../UniqueSpeciesCount";
import { Component, h } from "preact";

export default class ChatBox extends Component<IChatBoxProps, IChatBoxState> {
    state: IChatBoxState = {
        newMessage: "",
        messages: [],
        showModal: false,
        toasts: []
    };

    constructor(props: IChatBoxProps) {
        super(props);

        onUserConnects((user) => {
            let toasts = this.state.toasts;
            if (user != this.props.currentUsername)
            {
                toasts.push({title: 'User Connected', message: `${user} has connected.`});

                this.setState({toasts: toasts});

                setTimeout(() => {
                    this.setState({toasts: []})
                }, 2000);
            }
        });

        onUserDisconnects((user) => {
            let toasts = this.state.toasts;
            toasts.push({title: 'User Disconnected', message: `${user} has disconnected.`});

            this.setState({toasts: toasts});

            setTimeout(() => {
                this.setState({toasts: []})
            }, 2000);
        });

        onNewMessage((message: Message) => {
            let messages = this.state.messages;
            messages.push(message);
            this.setState({messages: messages});
        });

        MessagesApi.retrieveMessages()
            .then(m => {
                this.setState({messages: m});
            });

        this.updateMessageContent = this.updateMessageContent.bind(this);
        this.sendSimpleMessage = this.sendSimpleMessage.bind(this);
    }

    updateMessageContent(e: any) {
        this.setState({newMessage: e.target.value});
    }

    async sendSimpleMessage() {
        let message: Message = emptyMessage(this.props.currentUsername);
        message.content = this.state.newMessage;
        await MessagesApi.sendMessage(message);
        this.setState({newMessage: ""});
    }

    render() {
        return (
            <div>
                {this.state.toasts.map((toast, index) => {
                    return <Toast key={index} title={toast.title} message={toast.message}/>
                })}
                <div class="container">
                    {this.state.showModal && <SendMessageModal onClose={() => this.setState({showModal: false})}
                                                               currentUsername={this.props.currentUsername}/>}
                    <div class="card">
                        <div class="card-header">
                            Sappo Chat ({countNumberOfUniqueSpecies(this.state.messages)} unique species of frog)
                        </div>
                        <div class="card-body chatbox-content">
                            {this.state.messages.map((message, index) => {
                                return <MessageBox key={index} currentUsername={this.props.currentUsername}
                                                   message={message}/>
                            })}
                        </div>
                        <div class="card-footer">
                            <div class="input-group">
                                <input class="form-control" value={this.state.newMessage} onChange={this.updateMessageContent} />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" onClick={this.sendSimpleMessage}>Send</button>
                                </div>
                            </div>
                            <br/>
                            <div class="input-group">
                                <button class="btn btn-secondary float-right"
                                        onClick={() => this.setState({showModal: true})}>Send Species Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export interface IChatBoxProps {
    readonly currentUsername: string;
}

export interface IChatBoxState {
    newMessage: string,
    messages: Message[],
    showModal: boolean,
    toasts: { title: string, message: string }[]
}
