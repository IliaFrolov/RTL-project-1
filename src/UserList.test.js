import { getByTestId, render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserList from "./UserList";

const renderComponents = () => {
  const mockUserList = [
    { name: "testName1", email: "testUserEmail1" },
    { name: "testName2", email: "testUserEmail2" },
    { name: "testName3", email: "testUserEmail3" },
  ];
  return { mockUserList, ...render(<UserList users={mockUserList} />) };
};
test("render one row per user", () => {
  const { mockUserList, container } = renderComponents();
  // screen.logTestingPlaygroundURL();
  // const rows = screen.getAllByRole("row");

  // First approach
  // const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // Second approach
  // eslint-disable-next-line
  const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(mockUserList.length);
});

test("render the email and name of esch user", () => {
  const { mockUserList } = renderComponents();

  for (let user of mockUserList) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
