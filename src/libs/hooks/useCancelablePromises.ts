import { useRef } from "react";

type CancelablePromise = {
  promise: Promise<unknown>;
  cancel: () => void;
};

export const cancellablePromise = (promise: Promise<unknown>): CancelablePromise => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error) => reject({ isCanceled, error })
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};

export const delay = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

export const useCancellablePromises = () => {
  const pendingPromises = useRef<CancelablePromise[]>([]);

  const appendPendingPromise = (promise: CancelablePromise) => (pendingPromises.current = [...pendingPromises.current, promise]);

  const removePendingPromise = (promise: CancelablePromise) =>
    (pendingPromises.current = pendingPromises.current.filter((p) => p !== promise));

  const clearPendingPromises = () => pendingPromises.current.map((p) => p.cancel());

  const api = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  };

  return api;
};
