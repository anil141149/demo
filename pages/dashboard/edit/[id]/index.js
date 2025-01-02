import AddandEdit from '@/components/AddandEdit';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        if (id) {
            getById();
        }
    }, [id]);

    const getById = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPostData(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    return (
        <div>
            {postData ? (
                <AddandEdit initialData={postData} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditPage;
