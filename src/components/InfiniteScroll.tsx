import React, { Component, createRef, RefObject } from "react";
import Dynamic from "./Dynamic";

export default class InfiniteScroll extends Component<
  {
    children?: string;
  },
  { order: number }
> {
  target: RefObject<HTMLDivElement>;

  constructor(props: { children?: string }) {
    super(props);
    this.state = { order: 1 };
    this.target = createRef();
  }

  componentDidMount(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio === 1) {
            console.log("データ取得する箇所までスクロールされた");
            this.countUp();
          }
        });
      },
      { threshold: 1.0 }
    );

    observer.observe(this.target.current as Element);
  }

  private countUp() {
    const { order } = this.state;
    if (order >= 20) {
      console.log("もう上限なので取得しない");
      return;
    }
    this.setState({ order: order + 1 });
  }

  render() {
    const { order } = this.state;
    return (
      <div>
        {Array(order)
          .fill(null)
          .map((_, idx) => (
            <Dynamic key={idx.toString()} id={idx + 1} />
          ))}
        <span ref={this.target}></span>
      </div>
    );
  }
}
