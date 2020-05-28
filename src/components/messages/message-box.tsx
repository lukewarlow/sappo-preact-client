import { isSpeciesMessage, Message } from "../../api/MessagesApi";
import { formatDistanceStrict } from "date-fns";
import { Component, h, VNode } from "preact";

export default class MessageBox extends Component<IMessageBoxProps, IMessageBoxState> {
    render() {
        let cardContents: VNode;
        let relativeTime = formatDistanceStrict(new Date(this.props.message.timestamp), new Date(Date.now()));

        if (isSpeciesMessage(this.props.message)) {
            cardContents = (
                <div class="card-body" title={`${relativeTime} ago`}>
                    <div><span class="font-weight-bold">{this.props.message.username}</span>: {this.props.message.content}</div>
                    <div>Species: {this.props.message.species}</div>
                    <div>Abundance: {this.props.message.abundance}</div>
                    <div>Temperature: {this.props.message.temperature}°C</div>
                    {this.props.message.image && <img class="img-fluid" alt={`${this.props.message.username}'s image`} src={this.props.message.image} />}
                </div>
            )
        } else {
            cardContents = (
                <div class="card-body" title={`${relativeTime} ago`}>
                    <div class="font-weight-bold">{this.props.message.username}: {this.props.message.content}</div>
                </div>
            )
        }

        return (
            <div class="d-inline-block w-100 mb-2">
                <div class={`card message-box ${isSpeciesMessage(this.props.message) ? 'border-success' : ''} ${this.props.message.username == this.props.currentUsername ? 'bg-success float-right' : 'bg-light'}`}>
                    {cardContents}
                </div>
            </div>
        )
    }
}

export interface IMessageBoxProps {
    readonly message: Message,
    readonly currentUsername: string
}

export interface IMessageBoxState {
}
