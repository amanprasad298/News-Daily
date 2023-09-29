import React, { Component } from "react";
import NewsItem from "./NewsItem";
import img from "../images/images.png";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  cap = (string) =>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title= `${this.cap(this.props.category)} - News Daily`
  }

  async updateNews() {
    this.props.setProgress(30)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68728a12840d41ccb0d35c0e8ecee08a&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50)
    let parseDate = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parseDate.articles,
      totalResults: parseDate.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handleNext = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // handlePrev = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };


  fetchMoreData = async() => {
    this.setState({page: this.state.page +1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68728a12840d41ccb0d35c0e8ecee08a&pageSize=${this.props.pageSize}&page=${this.state.page+1}`;

    let data = await fetch(url);
    let parseDate = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseDate.articles),
      totalResults: parseDate.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-white text-center" style={{ marginTop: "6rem" }}>
          News Daily - Top Headlines ({this.cap(this.props.category)})
        </h1>

        {this.state.loading && (
          <div className="my-5">
            <Spinner />
          </div>
        )}

          <InfiniteScroll style={{overflow: 'hidden'}}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >

          <div className="container" style={{scrollBehavior: 'smooth'}}>
          <div className=" row">
          {this.state.articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4 my-3">
                  <NewsItem
                    title={
                      element.title
                        ? element.title.slice(0, 60) + "........."
                        : ""
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 120) + "........."
                        : ""
                    }
                    imgUrl={element.urlToImage ? element.urlToImage : img}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>

        {/* <div
          style={{ padding: "0" }}
          className="container d-flex justify-content-between my-5"
        >
          <button
            disabled={this.state.page <= 1}
            type="button"
            style={{ width: "130px" }}
            className="btn btn-primary"
            onClick={this.handlePrev}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 2 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            style={{ width: "130px" }}
            className="btn btn-primary"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
