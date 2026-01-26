import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Activity } from '../../types/TypesExport';
import API from '../../utils/api';
import { API_URL } from '../../utils/config';

const ActivitiesApiByPrice = () => {
    const [activities, setActivities] = useState<Activity[]>([]);

    const { price, _id, name } = useParams<{ _id: string, name: string, price: string }>();

    useEffect(() => {
        const fetchActivitiesByPrice = async () => {
        try {
            console.log('Fetching activities by price:', price, _id, name);
            const response = await API.get(`${API_URL}/activities/filter/price?price=${price}`);
            console.log('Response data:', response.data);
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities by price:', error);
        }
        };

        fetchActivitiesByPrice();
    }, []);

    console.log('Activities:', activities);

    return (
        <ul>
        {activities.map((activity) => (
            <li key={activity._id}>{activity.name} price: {activity.price} Eur.</li>
        ))}
        </ul>
    );
};

export default ActivitiesApiByPrice;