import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

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

  expect(onUserAdd).toHaveBeenCalled();
  expect(onUserAdd).toHaveBeenCalledWith({
    name: testUserName,
    email: testUserEmail,
  });
});
