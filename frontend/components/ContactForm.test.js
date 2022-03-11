import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  expect(screen.getByText("Contact Form")).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText("First Name*");
  userEvent.type(firstNameInput, "abcd");
  const submit = screen.getByText("Submit");
  userEvent.click(submit);
  await waitFor(() => {
    expect(
      screen.getByText("Error: firstName must have at least 5 characters.")
    ).toBeInTheDocument();
  });
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submit = screen.getByText("Submit");
  userEvent.click(submit);
  await waitFor(() => {
    expect(
      screen.getByText("Error: firstName must have at least 5 characters.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Error: lastName is a required field.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Error: email must be a valid email address.")
    ).toBeInTheDocument();
  });
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText("First Name*");
  const lastName = screen.getByLabelText("Last Name*");
  const submit = screen.getByText("Submit");
  userEvent.type(firstName, "John");
  userEvent.type(lastName, "Doe");
  userEvent.click(submit);
  await waitFor(() => {
    expect(
      screen.getByText("Error: email must be a valid email address.")
    ).toBeInTheDocument();
  });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const email = screen.getByLabelText("Email*");
  userEvent.type(email, "notanemail");
  await waitFor(() =>
    expect(
      screen.getByText("Error: email must be a valid email address.")
    ).toBeInTheDocument()
  );
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const submit = screen.getByText("Submit");
  userEvent.click(submit);
  await waitFor(() =>
    expect(
      screen.getByText("Error: lastName is a required field.")
    ).toBeInTheDocument()
  );
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
