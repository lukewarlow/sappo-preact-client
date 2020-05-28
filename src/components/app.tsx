import { Component, h } from "preact";
import { AccountApi } from "../api/AccountApi";
import TopBar from "./top-bar";
import LoginOrRegister from "./login-or-register";
import ChatBox from "./chat-bot";

export default class App extends Component<IAppProps, IAppState> {
    state: IAppState = {
        isLoggedIn: false,
        currentUsername: ""
    };

    constructor(props: IAppProps) {
        super(props);

        this.successfulLogin = this.successfulLogin.bind(this);
        this.logout = this.logout.bind(this);
        let username: string | null = window.localStorage.getItem("username");
        if (username)
        {
            this.state.currentUsername = username;
            this.state.isLoggedIn = true;
        }
    }

    successfulLogin(username: string) {
        this.setState({isLoggedIn: true, currentUsername: username});
    }

    async logout() {
        await AccountApi.logout(this.state.currentUsername)
            .then(async _ => {
                this.setState({currentUsername: "", isLoggedIn: false});
                if (navigator.credentials && navigator.credentials.preventSilentAccess) {
                    await navigator.credentials.preventSilentAccess();
                }
                window.location.reload();
            });
    }

    render() {
        return (
            <div>
                <TopBar />
                <div class="container-fluid">
                    {!this.state.isLoggedIn && <LoginOrRegister onSuccessfulLogin={this.successfulLogin}/>}
                    {this.state.isLoggedIn && <ChatBox currentUsername={this.state.currentUsername}/>}
                    {this.state.isLoggedIn && <button class="btn btn-danger" onClick={this.logout}>Logout</button>}
                </div>
            </div>
        );
    }
}

export interface IAppProps {

}

export interface IAppState {
    isLoggedIn: boolean,
    currentUsername: string
}

