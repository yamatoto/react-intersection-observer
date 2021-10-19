import React, { Component } from "react";

export default class Dynamic extends Component<
  {
    id: number;
  },
  { articles: { id: number; title: string; author: string }[] | null }
> {
  constructor(props: { id: number }) {
    super(props);
    this.state = { articles: null };
  }

  componentDidMount(): void {
    this.fetchArticle();
  }

  private async fetchArticle() {
    const { id } = this.props;
    const res = await fetch(`http://localhost:3004/article/${id}`);
    const js = await res.json();
    console.log("データ10件取得した");
    this.setState({ articles: js.data });
  }

  render() {
    const { id } = this.props;
    const { articles } = this.state;
    return (
      <div>
        <div>id: {id}</div>
        {articles?.map((article, idx) => (
          <div key={idx.toString()}>
            articleId: {articles[idx].id} title: {articles[idx].title} author:{" "}
            {articles[idx].author}
          </div>
        ))}
      </div>
    );
  }
}
