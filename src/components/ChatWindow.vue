<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <!-- Format for plain text -->
        <div v-if="!doc.isImg">
          <span class="created-at">{{ doc.createdAt }}</span>
          <span class="name">{{ doc.name }}</span>
          <br />
          <span class="message">
            {{ doc.message }}
          </span>
        </div>
        <!-- Format for gifs/images -->
        <div v-if="doc.isImg">
          <span class="created-at">{{ doc.createdAt }}</span>
          <span class="name">{{ doc.name }}</span>
          <br />
          <span class="message">
              <img :src="doc.gif" alt="">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getChats";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "vue";

export default {
  setup() {
    const { error, documents } = getCollection("messages");

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return {
            ...doc,
            createdAt: time,
          };
        });
      }
    });
    // auto-scroll to bottom of messages
    const messages = ref(null);
    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });
    return { error, documents, formattedDocuments, messages };
  },
};
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  overflow-x: hidden;
  word-wrap: normal;
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 300px;

  overflow: auto;
}

@media(max-width: 450px){
  .chat-window{
    padding: 0;
  }
  .messages{
    max-height: calc(100vh - 360px);
    padding: 10px;
  }
}
</style>
