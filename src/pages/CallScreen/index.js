import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import {
    RTCPeerConnection,
    RTCSessionDescription,
    mediaDevices,
} from 'react-native-webrtc';

const ChamadaVoz = ({ socket }) => {
    const [localStream, setLocalStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);

    useEffect(() => {
        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
            ],
        });

        setPeerConnection(pc);

        mediaDevices.getUserMedia({
            audio: true,
            video: false,
        }).then(stream => {
            setLocalStream(stream);
            pc.addStream(stream);
        });

        socket.on('respostaChamada', async (data) => {
            const desc = new RTCSessionDescription(data.sdp);
            await pc.setRemoteDescription(desc);
        });

        return () => {
            pc.close();
        };
    }, []);

    const iniciarChamada = async () => {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('chamada', {
            destino: 'id-do-destinatário',
            sdp: peerConnection.localDescription,
        });
    };

    return (
        <View>
            <Button title="Iniciar Chamada" onPress={iniciarChamada} />
        </View>
    );
};

export default ChamadaVoz;
