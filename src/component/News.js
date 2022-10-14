import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spiner from './Spiner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:6,
    category:"general"
  } 
  static propTypes ={
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props)
    console.log("Hello I am a Constructor from news")
    this.state={
      articles : [],
      loading : false,
      page:1
    }
    document.title = `NewsApp-${this.capitalizeFirstLetter(this.props.category)} news`
}

async componentDidMount(){
  // console.log("cmd")
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dfb0eaf413a0405a88e6317f6150b17f&page=1&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData =await data.json()
  console.log(parsedData)
  this.setState({articles:parsedData.articles,
    totalResults:parsedData.totalResults,
  loading:false})
}

handlePrevClick=async ()=>{
  console.log("I am Previous Click")
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dfb0eaf413a0405a88e6317f6150b17f&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData =await data.json()
  console.log(parsedData)
  this.setState({
    page: this.state.page -1,
    articles:parsedData.articles,
    loading:false
  })
}

handleNextClick=async ()=>{
  if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    console.log("I am Next Click")
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dfb0eaf413a0405a88e6317f6150b17f&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData =await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page +1,
      articles:parsedData.articles,
      loading:false
    })
}
}

  render() {
    // console.log("render")
    return (
      <div className='container my-3'>
        <h1 className='text-center' >NewsApp - Top Headline on {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spiner/>}
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <Newsitem  title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage?element.urlToImage:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"} newsUrl={element.url} date={element.publishedAt} author={element.author}/>
      </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick}>&#8592; Previous</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &#8594;</button>
        </div>
      </div>
    )
  }
}

export default News