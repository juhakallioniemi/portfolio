import * as React from "react";
import { Component } from "react";

export interface TextExpireProps {
    text: string;
    type: string;
    delay: number;
}

export interface TextExpireState {
    isVisible: boolean;
    text: string;
}

export class TextExpire extends React.Component<
    TextExpireProps,
    TextExpireState
> {
    timer: any = null;

    constructor(props: any) {
        super(props);
        this.state = {
            isVisible: false,
            text: ""
        };
    }

    componentDidUpdate() {
        if (this.props.text && this.state.isVisible) {
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({
                    isVisible: false
                });
            }, this.props.delay);
        }
    }

    static getDerivedStateFromProps(props: any, state: any) {
        if (props.text !== state.text) {
            return { text: props.text, isVisible: true };
        } else return null;
    }

    componentWillUnmount() {
        if (this.timer) clearTimeout(this.timer);
    }

    render() {
        return (
            <div className={"api-response" + " " + this.props.type}>
                <span
                    style={{
                        visibility: this.state.isVisible ? "visible" : "hidden"
                    }}
                >
                    {this.state.text}
                </span>
            </div>
        );
    }
}
