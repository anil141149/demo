import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const AddandEdit = ({ initialData }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({ title: '', body: '' });

    useEffect(() => {
        const registeredUser = localStorage.getItem("token");
        if (!registeredUser) {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                body: initialData.body,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (initialData) {
                await axios.put(`https://jsonplaceholder.typicode.com/posts/${initialData.id}`, formData);
            } else {
                await axios.post(`https://jsonplaceholder.typicode.com/posts`, formData);
            }
            router.push('/dashboard')
        } catch (error) {
            console.error('Error', error);
        }
    };


    return (
        <div style={{ width: '80%', margin: '0 auto', }}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        style={{ width: '100%', marginBottom: '10px' }}
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        style={{ width: '100%', marginBottom: '10px' }}
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        placeholder="Enter body"
                        rows={6}
                    />
                </div>
                <button variant="contained" type="submit" onClick={handleSubmit}>
                    {initialData?.id ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    )
}

export default AddandEdit