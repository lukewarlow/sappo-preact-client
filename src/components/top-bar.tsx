import { h } from "preact";

export default function TopBar() {
    return (
        <div class="navbar navbar-dark bg-success">
            <div class="container">
                <div class="navbar-brand">
                    <img alt="Sappo Logo" width={50} height={80} src="../assets/logo.jpg"/>
                    <h2 class="d-inline-block ml-3">Sappo</h2>
                </div>
            </div>
        </div>
    )
}
