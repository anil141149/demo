import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPosts();
    }, [currentPage, search]);

    const fetchPosts = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10&q=${search}`);
        setPosts(response.data);
        const total = response.headers['x-total-count'];
        setTotalPosts(Number(total));
    }

    const handleDelete = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        fetchPosts();
    }

    const handleEdit = (id) => {
        router.push(`/dashboard/edit/${id}`);
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <button onClick={() => router.push('/dashboard/add')}>Add</button>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Body</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.title}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.body}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px',width:'120px' }}>
                                <button onClick={() => handleEdit(post.id)} style={{ marginRight: '10px' }}>Edit</button>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '10px' }}>
                <button 
                    onClick={() => setCurrentPage((prev) =>(prev - 1))} 
                    disabled={currentPage === 1}
                    style={{ marginRight: '10px' }}
                >
                    Previous
                </button>
                <button 
                    onClick={() => setCurrentPage((prev) =>(prev + 1))} 
                    disabled={currentPage === Math.ceil(totalPosts / 10)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
