import { setInitStorage } from "../package/";

describe("typescript check", () => {
  it("init null", () => {
    const {} = setInitStorage({ local: {}, session: {} });
  });

  it("init local and session", () => {
    const {
      getLocalStorageItem,
      setLocalStorageItem,
      removeLocalStorageItem,
      getSessionStorageItem,
      setSessionStorageItem,
      removeSessionStorageItem,
    } = setInitStorage({
      local: {
        auth: {
          id: "",
          username: "",
        },
        appid: "",
        1: 2,
      },
      session: {
        appid: "",
      },
    });

    const appid: string = getLocalStorageItem("appid", true);
    const auth: { id: string; username: string } | null =
      getLocalStorageItem("auth");
    setLocalStorageItem("appid", "2");
    setLocalStorageItem("auth", {
      id: "",
      username: "",
    });
    removeLocalStorageItem("appid");
    removeLocalStorageItem("auth");
    getSessionStorageItem("appid");
    setSessionStorageItem("appid", "s");
    removeSessionStorageItem("appid");
  });

  it("init complex local and session", () => {
    const { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } =
      setInitStorage({
        local: {
          auth: {
            id: "",
            username: "",
            origin: {
              id: "",
              zIndex: 0,
            },
          },
          appid: "",
        },
        session: {
          token: 1,
        },
      });

    getLocalStorageItem("appid");
    getLocalStorageItem("auth");
    setLocalStorageItem("appid", "s");
    setLocalStorageItem("auth", {
      id: "",
      username: "",
      origin: {
        id: "",
        zIndex: 0,
      },
    });
    removeLocalStorageItem("appid");
    removeLocalStorageItem("auth");
  });
});
