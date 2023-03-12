import { setInitStorage } from "../package/";

const INIT = {
  local: { token: "1" },
  session: {},
};

test("getLocalStorageItem", async () => {
  const { getLocalStorageItem } = setInitStorage(INIT);
  expect(getLocalStorageItem("token")).toEqual(null);
  expect(getLocalStorageItem("token", true)).toEqual("1");

  window.localStorage.setItem("token", JSON.stringify("123"));
  expect(getLocalStorageItem("token")).toEqual("123");
  expect(getLocalStorageItem("token", true)).toEqual("123");

  window.localStorage.removeItem("token");
  expect(getLocalStorageItem("token")).toEqual(null);
  expect(getLocalStorageItem("token", true)).toEqual("1");
});

test("setLocalStorageItem", async () => {
  const { setLocalStorageItem } = setInitStorage(INIT);
  expect(JSON.parse(window.localStorage.getItem("token") as string)).toEqual(
    null
  );

  setLocalStorageItem("token", "1");
  expect(JSON.parse(window.localStorage.getItem("token") as string)).toEqual(
    "1"
  );
});

test("removeLocalStorageItem", async () => {
  const { removeLocalStorageItem } = setInitStorage(INIT);
  window.localStorage.setItem("token", JSON.stringify("123"));
  expect(JSON.parse(window.localStorage.getItem("token") as string)).toEqual(
    "123"
  );
  removeLocalStorageItem("token");
  expect(JSON.parse(window.localStorage.getItem("token") as string)).toEqual(
    null
  );
});

test("clearLocalStorageItem", async () => {
  const { clearLocalStorageItem } = setInitStorage(INIT);
  window.localStorage.setItem("token", JSON.stringify("123"));
  window.localStorage.setItem("token2", JSON.stringify("321"));
  expect(JSON.parse(window.localStorage.getItem("token") as string)).toEqual(
    "123"
  );
  expect(JSON.parse(window.localStorage.getItem("token2") as string)).toEqual(
    "321"
  );

  clearLocalStorageItem();
  expect(JSON.parse(window.localStorage.getItem("token") as string)).toEqual(
    null
  );
  expect(JSON.parse(window.localStorage.getItem("token2") as string)).toEqual(
    null
  );
});
