import { setInitStorage } from "../package/";

const INIT = {
  local: { token: "1" },
  session: {},
};

test("option.defaultUseInit is true", async () => {
  const { getLocalStorageItem } = setInitStorage(INIT, {
    defaultUseInit: true,
  });
  expect(getLocalStorageItem("token", false)).toEqual(null);
  expect(getLocalStorageItem("token")).toEqual("1");

  window.localStorage.setItem("token", JSON.stringify("123"));
  expect(getLocalStorageItem("token", false)).toEqual("123");
  expect(getLocalStorageItem("token")).toEqual("123");

  window.localStorage.removeItem("token");
  expect(getLocalStorageItem("token", false)).toEqual(null);
  expect(getLocalStorageItem("token")).toEqual("1");
});
