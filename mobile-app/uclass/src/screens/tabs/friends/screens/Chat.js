import React, { useState, useEffect } from "react"

import { View, Text, FlatList, TextInput, Pressable, Image } from "react-native"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

import supabase from "../../../../scripts/supabase"

import { colors, screen } from "../../../../constants"

const ChatScreen = ({ route: { params: { id, profilePicture, displayName } } }) => {
    const [allChats, setAllChats] = useState(null)

    let chats = allChats == null ? [] : allChats[id]
    
    if (chats == null) chats = []

    const getAllChats = async (callback) => {
        const session = await supabase.auth.getSession()

        const selfId = session.data.session.user.id
        const self = (await supabase.from("profiles").select().eq("id", selfId)).data[0]
        const selfChats = self.chats

        callback(selfChats)
    }

    useEffect(() => {
        let isMounted = true

        getAllChats((newAllChats) => {
            if (isMounted) setAllChats(newAllChats)
        })

        const interval = setInterval(() => {
            getAllChats((newAllChats) => {
                if (isMounted) setAllChats(newAllChats)
            })
        }, 50 * 1000)

        return () => {
            isMounted = false

            clearInterval(interval)
        }
    }, [])

    const handleChatUpload = async (senderId, receiverId, message) => {
        const senderChats = (await supabase.from("profiles").select().eq("id", senderId)).data[0].chats || {}

        if (!senderChats[receiverId]) senderChats[receiverId] = []

        senderChats[receiverId].push({
            message,
            isMe: true
        })

        await supabase.from("profiles").update({ chats: senderChats }).eq("id", senderId)

        const receiverChats = (await supabase.from("profiles").select().eq("id", receiverId)).data[0].chats || {}

        if (!receiverChats[senderId]) receiverChats[senderId] = []

        receiverChats[senderId].push({
            message,
            isMe: false
        })

        await supabase.from("profiles").update({ chats: receiverChats }).eq("id", receiverId)
    }

    const [messageInput, setMessageInput] = useState("")

    const sendMessage = async () => {
        const session = await supabase.auth.getSession()

        const selfId = session.data.session.user.id

        await handleChatUpload(selfId, id, messageInput)
        
        setMessageInput("")

        await getAllChats(setAllChats)
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.lightGrey, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <View style={{ flexDirection: "row", padding: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.white }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
                    <Image style={{ width: "100%", height: "100%" }} src={profilePicture} />
                </View>
                <Text style={{ marginLeft: 20, fontSize: 24, fontWeight: "700", color: colors.black }}>
                    {
                        displayName
                    }
                </Text>
            </View>
            <FlatList inverted data={[...chats].reverse()} renderItem={({ item: { message, isMe }, index }) => {
                if (isMe) return (
                    <View key={index} style={{ marginTop: 10, marginRight: 10, maxWidth: screen.width - 80, backgroundColor: colors.red, alignSelf: "flex-end", borderRadius: 10, borderBottomRightRadius: 0 }}>
                        <Text style={{ padding: 10, fontSize: 16, color: colors.white }}>
                            {
                                message
                            }
                        </Text>
                    </View>
                )
        
                return (
                    <View key={index} style={{ marginTop: 10, marginLeft: 10, maxWidth: screen.width - 80, backgroundColor: colors.black, alignSelf: "flex-start", borderRadius: 10, borderBottomLeftRadius: 0 }}>
                        <Text style={{ padding: 10, fontSize: 16, color: colors.white }}>
                            {
                                message
                            }
                        </Text>
                    </View>
                )
            }} ListHeaderComponent={
                <View style={{ position: "relative", margin: 20, justifyContent: "center" }}>
                    <TextInput value={messageInput} onChangeText={setMessageInput} style={{ width: "100%", borderRadius: 10, padding: 20, paddingRight: 60, backgroundColor: colors.grey, color: colors.black }} selectionColor={colors.red} />
                    <Pressable onPress={sendMessage} style={{ position: "absolute", right: 15 }}>
                        <View style={{ padding: 10 }}>
                            <FontAwesomeIcon icon={faPaperPlane} color={colors.red} size={18} />
                        </View>
                    </Pressable>
                </View>
            } />
        </View>
    )
}

export default ChatScreen