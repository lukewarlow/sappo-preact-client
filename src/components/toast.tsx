import { h } from "preact";

export default function Toast(props: IToastProps) {
    return (
        <div class="position-relative toast-container">
            <div class="toast fade show position-absolute toast-position" role="alert">
                <div class="toast-header">
                    <strong>{props.title}</strong>
                    <button type="button" class="ml-2 mb-1 close float-right" data-dismiss="toast">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    {props.message}
                </div>
            </div>
        </div>
    )
}

export interface IToastProps {
    readonly title: string;
    readonly message: string;
}
