// client/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState('');
  const [instagramData, setInstagramData] = useState(null);
  const [dmMessages, setDmMessages] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');
    if (token) {
      setAccessToken(token);
      fetchInstagramData(token);
      fetchDMMessages(token);
    }
  }, []);

  const fetchInstagramData = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/instagram-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstagramData(response.data);
    } catch (error) {
      console.error('Error fetching Instagram data:', error);
    }
  };

  const fetchDMMessages = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/dm-messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDmMessages(response.data);
    } catch (error) {
      console.error('Error fetching DM messages:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sol Taraf: Kargo, E-Fatura, Ödeme Linkleri */}
      <div style={{ width: '50%', padding: '20px', borderRight: '1px solid #ccc' }}>
        <h2>Kargo Deposu</h2>
        <ul>
          <li><a href="#">Kargo Yönetimi</a></li>
          <li><a href="#">E-Fatura Oluştur</a></li>
          <li><a href="#">Ödeme Al</a></li>
        </ul>
      </div>

      {/* Sağ Taraf: Instagram Verileri ve DM Mesajları */}
      <div style={{ width: '50%', padding: '20px' }}>
        <h2>Instagram Verileri</h2>
        {instagramData ? (
          <div>
            <p><strong>Kullanıcı Adı:</strong> {instagramData.username}</p>
            <p><strong>ID:</strong> {instagramData.id}</p>
          </div>
        ) : (
          <p>Veri yükleniyor...</p>
        )}

        <h2>DM Mesajları</h2>
        {dmMessages.length > 0 ? (
          <ul>
            {dmMessages.map((msg) => (
              <li key={msg.id}>{msg.message}</li>
            ))}
          </ul>
        ) : (
          <p>Mesaj bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
