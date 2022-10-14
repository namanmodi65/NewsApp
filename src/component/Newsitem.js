import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,date,author}=this.props

        return (
            <div className='my-3'>
                <div className="card" style={{width: "18rem"}}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p class="card-text"><small class="text-muted">By {author?author:"unknown"} on {date}</small></p>
                        <a href={newsUrl} target="blank" className="btn btn-sn btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem