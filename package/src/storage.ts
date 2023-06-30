type OperationMethod = "get" | "set" | "remove" | "clear";

type OptionProps = {
  defaultUseInit: boolean;
};

const INIT_OPTIONS = {
  defaultUseInit: false,
};

export const setInitStorage = <
  LocalStroage extends Record<string, any>,
  SessionStroage extends Record<string, any>
>(
  init: {
    local: LocalStroage;
    session: SessionStroage;
  },
  option: OptionProps = INIT_OPTIONS
) => {
  let INIT_LOCAL_STORAGE = init.local;
  let INIT_SESSION_STORAGE = init.session;
  const getStorageItemFunction = <
    InitStorage extends Record<string, any>,
    Method extends OperationMethod
  >(
    object: Storage,
    action: Method,
    init_storage: InitStorage
  ) => {
    const funcMap = {
      get: <T extends keyof InitStorage, GetExtends extends boolean>(
        item: T,
        ifNullIsGetInit?: GetExtends
      ): GetExtends extends true ? InitStorage[T] : InitStorage[T] | null => {
        const isGetInit =
          ifNullIsGetInit === undefined
            ? option.defaultUseInit
            : ifNullIsGetInit;
        let local = null;
        if (typeof window !== "undefined") {
          const item_string = object.getItem(item as string);
          if (item_string) {
            try {
              local = JSON.parse(item_string);
            } catch (err) {
              console.log(1);
              console.error(`${err} --from \`init-stoarge\``);
            }
          } else if (isGetInit) {
            local = init_storage[item];
          }
        }
        return local;
      },
      set: <T extends keyof InitStorage>(
        item: T,
        value: (typeof init_storage)[T]
      ): void => {
        if (typeof window !== "undefined") {
          object.setItem(item as string, JSON.stringify(value));
        }
      },
      remove: <T extends keyof InitStorage>(item: T): void => {
        if (typeof window !== "undefined") {
          object.removeItem(item as string);
        }
      },
      clear: (): void => {
        if (typeof window !== "undefined") {
          object.clear();
        }
      },
    };
    return funcMap[action];
  };

  const LOCAL = typeof window !== "undefined" ? localStorage : ({} as Storage);
  const SESSION =
    typeof window !== "undefined" ? sessionStorage : ({} as Storage);

  const getLocalStorageItem = getStorageItemFunction(
    LOCAL,
    "get",
    INIT_LOCAL_STORAGE
  );
  const setLocalStorageItem = getStorageItemFunction(
    LOCAL,
    "set",
    INIT_LOCAL_STORAGE
  );
  const removeLocalStorageItem = getStorageItemFunction(
    LOCAL,
    "remove",
    INIT_LOCAL_STORAGE
  );
  const clearLocalStorageItem = getStorageItemFunction(
    LOCAL,
    "clear",
    INIT_LOCAL_STORAGE
  );
  const getSessionStorageItem = getStorageItemFunction(
    SESSION,
    "get",
    INIT_SESSION_STORAGE
  );
  const setSessionStorageItem = getStorageItemFunction(
    SESSION,
    "set",
    INIT_SESSION_STORAGE
  );
  const removeSessionStorageItem = getStorageItemFunction(
    SESSION,
    "remove",
    INIT_SESSION_STORAGE
  );
  const clearSessionStorageItem = getStorageItemFunction(
    SESSION,
    "clear",
    INIT_SESSION_STORAGE
  );
  return {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
    clearLocalStorageItem,
    getSessionStorageItem,
    setSessionStorageItem,
    removeSessionStorageItem,
    clearSessionStorageItem,
  };
};
