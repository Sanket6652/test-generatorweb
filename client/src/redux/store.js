import { configureStore } from "@reduxjs/toolkit";

const userInitialState = {
  _id: "",
  name: "",
  email: "",
  division: "",
  isLoggedIn: false,
  isAvailable: false,
  isFetched: false
}

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case "user/logInUser":
      return {
        _id: action.payload._id || "",
        name: action.payload.name || "",
        email: action.payload.email || "",
        division: action.payload.division || "",
        isLoggedIn: true,
        type: action.payload.type || ""
      }

    case "user/logout":
      return { ...userInitialState };

    case "user/null":
      return state;

    default:
      return state;
  }
}

const liveTestInitialState = {
  testDuration: -1,
  questions: [],
  activeQuestionNo: -1,
  activeQuestion: {},
  userResponses: [],
  isStarted: false
}

function liveTestReducer(state = liveTestInitialState, action) {
  switch (action.type) {
    case "liveTest/start-test":
      return { ...state, ...action.payload, isStarted: action.payload.isAvailable, activeQuestionNo: 1, activeQuestion: action.payload.questions[0], userResponses: Array.from({ length: action.payload.questions.length }, () => (-1)) };

    case "liveTest/set-currentQuestion":
      return { ...state, activeQuestionNo: action.payload, activeQuestion: state.questions[action.payload - 1] }

    case "liveTest/save-currentAnswer":
      return {
        ...state,
        userResponses: state.userResponses.map((answer, index) => index === state.activeQuestion.id - 1 ? action.payload.answer : answer),
        activeQuestion: state.activeQuestionNo < state.questions.length ? state.questions[state.activeQuestionNo] : state.activeQuestion,
        activeQuestionNo: state.activeQuestionNo < state.questions.length ? state.activeQuestionNo + 1 : state.activeQuestionNo,
      }

    case "liveTest/go-to-previousQuestion":
      // const responses[action.payload.answer] = action.payload.answer;
      return {
        ...state,
        activeQuestion: state.activeQuestionNo > 1 ? state.questions[state.activeQuestionNo - 2] : state.activeQuestion,
        activeQuestionNo: state.activeQuestionNo > 1 ? state.activeQuestionNo - 1 : state.activeQuestionNo,
      }

    case "liveTest/go-to-nextQuestion":
      return {
        ...state,
        activeQuestion: state.activeQuestionNo < state.questions.length ? state.questions[state.activeQuestionNo] : state.activeQuestion,
        activeQuestionNo: state.activeQuestionNo < state.questions.length ? state.activeQuestionNo + 1 : state.activeQuestionNo,
      }

    case "liveTest/submitTest":
      return { ...liveTestInitialState }
    case "liveTest/setNotFetched":
      return { ...state, isFetched: false, }

    default:
      return state;
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    liveTest: liveTestReducer
  }
});

export function checkIfUserLoggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) return { type: "user/logInUser", payload: user }
  return { type: "user/null" }
}

export function logout() {
  return async function (dispatch) {
    localStorage.setItem("user", null);
    dispatch({ type: "user/logout" })
  }
}

// function for test reducer
export function startTest(id) {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3000/test/get-test-random-order/${id}`);
    const data = await response.json();
    const testTime = new Date(data.test.availableAt)
    const current = new Date();
    const endTime = new Date(testTime.getTime() + data.test.duration * 60000)
    dispatch({ type: "liveTest/start-test", payload: ({ ...data.test, isFetched: true, isAvailable: current >= testTime && current <= endTime }) })
  }
}

export function setCurrentQuestion(id) {
  return { type: "liveTest/set-currentQuestion", payload: id }
}

export function saveCurrentAnswer(answer) {
  return { type: "liveTest/save-currentAnswer", payload: { answer } }
}

export function goToPreviousQuestion() {
  return { type: "liveTest/go-to-previousQuestion" }
}

export function goToNextQuestion() {
  return { type: "liveTest/go-to-nextQuestion" }
}

export function endTest() {
  return { type: "liveTest/submitTest" }
}

// created store
store.dispatch(checkIfUserLoggedIn());