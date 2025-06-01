// fetch new articles
const apiKey = import.meta.env.VITE_NEWS_API;

export const fetchNews = async ( limit ) => {
        try {

            const res = await fetch(`https://newsapi.org/v2/everything?q=ecommerce&language=en&pageSize=${limit}&page=7&apiKey=${apiKey}`);

            if (!res.ok) {
            throw new Error(`NewsAPI error: ${res.status}`);
            }

            const data = await res.json()
            return data.articles
        } catch (error) {
            console.error("Error fetching news articles!!");
            return [];
        }

} 