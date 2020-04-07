import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer BsorjAtpK-0chY-f0DHDBL3yFZEfh0iCnwkAfZnh9S7HS-UBj-MqHZL_sLzbserFLwaJzNc6emI_SlX9l1OSzaxjo0ftZl3QMWe09FGqhnDd0Vi1xhDbW0k6nFOCXnYx'
    }
});