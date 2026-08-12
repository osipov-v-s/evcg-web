import React, { useState, useEffect } from 'react';
import api from '../../../services/api/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/reusable/button';
import { Trash } from 'lucide-react';
import "../css/form.css"
import { FieldInput } from '../../ui/reusable/fieldInput';
interface ApiTemplateProps<T> {
    postApiUrl?: string;
    getApiUrl: string;
    deleteApiUrl?: string;
    apiParams: Array<keyof T>; // Array of field names for the form
    name: string;
    idField?: keyof T; // Customizable ID field, defaults to 'id'
}

export const ApiTemplate = <T extends Record<string, unknown>>({
    postApiUrl, 
    getApiUrl, 
    deleteApiUrl, 
    apiParams, 
    name,
    idField = 'id' as keyof T,
}: ApiTemplateProps<T>) => {
    
    const [data, setData] = useState<T[]>([]);
    const [newValue, setNewValue] = useState<Partial<T>>({});
    const [loading, setLoading] = useState(false);
    const { getToken } = useAuth(); // Make sure this hook is defined

    // Fetch data on component mount
    useEffect(() => {
        if (!getApiUrl) return;
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = getToken();
                const response = await api.get<T[]>(getApiUrl, {
                    headers: { Authorization: token }
                });
                setData(response.data);
            } catch(err) {
                console.error('Error fetching data:', err);
                toast.error('Не удалось загрузить справочник');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [getApiUrl]); // Re-fetch if URL changes

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewValue(prev => ({ ...prev, [name]: value }));
    };

    // Add new data
    const addData = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!postApiUrl) return;
        
        try {
            setLoading(true);
            const token = getToken();
            await api.post(postApiUrl, newValue, {
                headers: { Authorization: token }
            });
            
            // Refresh data after adding
            const response = await api.get<T[]>(getApiUrl, {
                headers: { Authorization: token }
            });
            setData(response.data);
            
            // Reset form
            setNewValue({});
        } catch(err) {
            console.error('Error adding data:', err);
            toast.error('Не удалось добавить запись');
        } finally {
            setLoading(false);
        }
    };

    // Delete data
    const deleteData = async (item: T) => {
        const itemId = item[idField];
        
        if (!itemId) {
            console.error("Error: No ID field found in data");
            return;
        }
        
        try {
            setLoading(true);
            const token = getToken();
            await api.delete(`${deleteApiUrl}/${itemId}`, {
                headers: { Authorization: token }
            });
            
            // Optimistic update - remove from local state
            setData(prevData => prevData.filter(item => item[idField] !== itemId));
            
        } catch(err) {
            console.error('Error deleting data:', err);
            toast.error('Не удалось удалить запись');
            // Refresh data to ensure consistency
            /*
            const response = await axios.get(getApiUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data);
            */
        } finally {
            setLoading(false);
        }
    };

    if (loading && !data.length) {
        return <div>Загрузка…</div>;
    }

    return (
        <div className="content-wrapper">
            <h3>{name}</h3>
            
            {/* Display data table */}
            {data.length > 0 && (
                <div className="table-header">
                    {Object.keys(data[0]).map(key => (
                        <div key={key} className="header-cell">
                            {key}
                        </div>
                    ))}
                    <div className="header-cell">Действия</div>
                </div>
            )}
            <div className="data-table">
                {data.length === 0 ? (
                    <p>Данных пока нет</p>
                ) : (
                    data.map((item, index) => (
                        <div key={String(item[idField]) || index} className="row">
                            {Object.entries(item).map(([key, value]) => (
                                <div key={key} className="param-cell" data-label={key}>
                                    {String(value)}
                                </div>
                            ))}
                            {deleteApiUrl &&
                                <button type="button" aria-label="Удалить запись" onClick={() => deleteData(item)}><Trash size={20} style={{color: "var(--error-color-600)"}} /></button>}
                        </div>
                    ))
                )}
            </div>
            
            {/* Add new data form */}
            {postApiUrl &&
                <form onSubmit={addData}>
                    {apiParams.map((param) => (
                        <div key={String(param)} className="param">
                            <FieldInput 
                                inputPlaceholder={String(param)} 
                                name={String(param)} 
                                inputValue={String(newValue[param] || '')}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Добавляем…' : 'Добавить'}
                    </Button>
                </form>
            }
        </div>
    );
};
