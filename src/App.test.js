import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "./App";

test("can receive a new user and show it on a list", async () => {
  render(<App />);
  const testUserName = "TestName";
  const testUserEmail = "TestEmaill@email.com";

  const nameImput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");
  user.click(nameImput);
  user.keyboard(testUserName);
  user.click(emailInput);
  user.keyboard(testUserEmail);
  user.click(button);

  // screen.logTestingPlaygroundURL();
  await waitFor(() => {
    screen.debug();

    const name = screen.getByRole("cell", { name: testUserName });
    const email = screen.getByRole("cell", { name: testUserEmail });
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
