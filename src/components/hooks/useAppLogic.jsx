import { useState, useEffect } from "react";
import axios from "axios";

export const useAppLogic = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [uploadedItems, setUploadedItems] = useState([]);

    const handleLoginClick = () => {
        setLoginModalOpen(true);
        setSignupModalOpen(false);
        setUploadModalOpen(false);
    };

    const handleSignupClick = () => {
        setLoginModalOpen(false);
        setSignupModalOpen(true);
        setUploadModalOpen(false);
    };

    const handleUploadClick = () => {
        if (!isLoggedIn) {
            alert("로그인을 해주세요");
        } else {
            setLoginModalOpen(false);
            setSignupModalOpen(false);
            setUploadModalOpen(true);
        }
    };

    const handleSwitch = () => {
        if (loginModalOpen) {
            setLoginModalOpen(false);
            setSignupModalOpen(true);
        } else {
            setSignupModalOpen(false);
            setLoginModalOpen(true);
        }
    };

    const handleLogin = (username, password) => {
        // 로그인 처리
        console.log(`로그인: ${username}, ${password}`)
        setIsLoggedIn(true)
        setLoginModalOpen(false);
    }

    const handleLogout = () => {
        // 로그아웃 처리
        setIsLoggedIn(false);
    };

    const handleSignup = (username, password) => {
        // 회원가입 처리
        console.log(`회원가입: ${username}, ${password}`);
        setSignupModalOpen(false);
    }

    const handleUpload = async ({ url, title, description, file }) => {
        // 업로드 처리
        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }
        const API_URL = "/uploads/upload";
        const formData = new FormData();
        formData.append("url", url);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", file);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }

        console.log(`업로드: ${url}, ${title}, ${description}`);
        setUploadModalOpen(false);

        setUploadedItems([...uploadedItems, { url, title, description, file }]);
    };

    const handleDelete = (index) => {
        setUploadedItems(uploadedItems.filter((_, i) => i !== index));
    };

    const handleEdit = (index, updatedItem) => {
        const updatedItems = uploadedItems.map((item, i) => {
            if (i === index) {
                return updatedItem;
            }
            return item;
        });
        setUploadedItems(updatedItems);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/uploads/upload');
                setUploadedItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return {
        loginModalOpen,
        signupModalOpen,
        uploadModalOpen,
        isLoggedIn,
        uploadedItems,
        handleLoginClick,
        handleSignupClick,
        handleUploadClick,
        handleSwitch,
        handleLogin,
        handleLogout,
        handleSignup,
        handleUpload,
        handleDelete,
        handleEdit,
        setLoginModalOpen,
        setSignupModalOpen,
        setUploadModalOpen
    }
}