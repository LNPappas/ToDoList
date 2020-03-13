import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, FlatList, Animated, TextInput } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem'; 
import AddTodo from './components/addtodo';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'test todo list', key: '1'},
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {
    if(text.length > 0){
      setTodos((prevTodos) => {
        return [
          { text: text, key: uuidv4() },
          ...prevTodos
        ];
      });
    } 
  }

  return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler} />
            <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                  )}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1, 
    padding: 40,
  },
  list: {
    flex: 1, 
    marginTop: 20,
  }, 
});
