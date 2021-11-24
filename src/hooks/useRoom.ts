/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState  } from "react";
import { database } from "../services/firebase";

type FirebaseQuestion = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>


type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}


export  function useRoom(roomId: string) {
  const [questions, setQuestions ] = useState<QuestionType[]>([]);
  const [title, setTitle ] = useState('');
}

useEffect(() => {
  const roomRef = database.ref(`rooms/${roomId}`);

  roomRef.on('value', room => {
    const databaseRoom = room.val();
    const firebaseQuestion: FirebaseQuestion = databaseRoom.questions ?? {};

    const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
      return {
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered,
      }
    })

    setTitle(databaseRoom.title);
    setQuestions(parsedQuestions);
  })
}, [roomId]);


function setTitle(title: any) {
  throw new Error("Function not implemented.");
}
function setQuestions(parsedQuestions: { id: string; content: string; author: { name: string; avatar: string; }; isHighlighted: boolean; isAnswered: boolean; }[]) {
  throw new Error("Function not implemented.");
}

