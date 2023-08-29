import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsItem from "./newsItem";

export default class NewsContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            newsData: [],
        };
    }
    
    componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {
        const apiKey = '997f0e41acf249f9ae502274124a1d09';
        const { searchTerm } = this.state;

        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`
            );
            const data = await response.json();

            if (data.articles.length > 0) {
                this.setState({ newsData: data.articles });
            } else {
                this.setState({ newsData: [] });
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value }, () => {
            this.fetchNews();
        });
    };

    render() {
        const { newsData, searchTerm } = this.state;

        return (
            <div>
                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Cari berita..."
                    value={searchTerm}
                    onChange={this.handleSearchChange}
                />
                {newsData.map((article, index) => (
                    <NewsItem key={index} article={article} />
                ))}
            </div>
        );
    }

}