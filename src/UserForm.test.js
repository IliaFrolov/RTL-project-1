import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

const addUser = () => {
  const testUserName = "TestName";
  const testUserEmail = "TestEmaill@email.com";

  //   const nameImput = screen.getByLabelText(/name/i);
  const nameImput = screen.getByRole("textbox", { name: /name/i });

  user.click(nameImput);
  user.keyboard(testUserName);

  //   const emailInput = screen.getByLabelText(/email/i);
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  user.click(emailInput);
  user.keyboard(testUserEmail);

  const button = screen.getByRole("button");
  user.click(button);
  return {
    user: { name: testUserName, email: testUserEmail },
    inputs: { nameImput, emailInput },
  };
};
test("it shows two inputs and a button", () => {
  render(<UserForm />);
  const imputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  expect(imputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when form is submitted", () => {
  const onUserAdd = jest.fn();

  render(<UserForm onUserAdd={onUserAdd} />);
  const { user } = addUser();
  expect(onUserAdd).toHaveBeenCalled();
  expect(onUserAdd).toHaveBeenCalledWith(user);
});

test("empties the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={jest.fn()} />);
  const {
    inputs: { nameImput, emailInput },
  } = addUser();

  await waitFor(() => {
    expect(nameImput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});
