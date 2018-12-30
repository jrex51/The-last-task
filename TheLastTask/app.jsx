import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavBar from "./Components/NavBar";
import BookCard from "./Components/BookCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </Container>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
