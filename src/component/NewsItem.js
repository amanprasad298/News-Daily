import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    
    let { title, description, imgUrl, url, author, date, source } = this.props;

    return (
      <div className="my-4 d-flex justify-content-evenly" style={{height: '34rem'}}>
        <div className="card bg-dark">
          <img src={imgUrl} className="card-img-top" style={{height: '250px'}} alt="..." />
          <span className="badge text-bg-danger" style={{borderRadius: '0'}}>{source}</span>

          <div className="card-body">

            <h5 className="card-title text-white">{title}</h5>
            <p className="card-text text-secondary">{description}</p>
            <p className="card-text">
              <small className="text-secondary position-absolute bottom-0" style={{
                marginBottom:'4rem'
              }}>
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary position-absolute bottom-0"
              style={{
                marginBottom:'1rem'
              }}
            >
              Read More
            </a>

          </div>

        </div>
      </div>
    );
  }
}

export default NewsItem;
