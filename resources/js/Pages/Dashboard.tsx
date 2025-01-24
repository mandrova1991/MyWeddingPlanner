import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import {useEffect, useState} from "react";
import api from "@/axios";

// TODO create a better way to init the first wedding.

export default function Dashboard() {
    const [wedding, setWedding] = useState<WeddingType>({} as WeddingType);

    useEffect(() => {
        const fetchFirstWedding = async () => {
            const response = await api.get(route('api.wedding.first'))
                .then((response) => {
                    setWedding(response.data.objectData);
                })
        };
        fetchFirstWedding();
    }, []);

    return (
        <>
            {wedding && (
                <DashboardLayout wedding={wedding.id}>
                    Dashboard
                </DashboardLayout>
            )}
        </>
    );
}
