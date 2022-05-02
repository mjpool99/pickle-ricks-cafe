import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

// const useChats = (chat) => {
//   const error = ref(null);

//   const getChats = async (doc) => {
//     error.value = null;

//     try {
//       await projectFirestore.chat(chat).add(doc);
//     } catch (err) {
//       console.log(err.message);
//       error.value = "Message not sent";
//     }
//   };
//   return { error, getChats };
// };
// export default useChats;

const useChats = (collection) => {
  const error = ref(null);

  const addDoc = async (doc) => {
    error.value = null;

    try {
      await projectFirestore.collection(collection).add(doc);
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
    }
  };

  return { error, addDoc };
};

export default useChats;
