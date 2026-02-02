type TData = {
  applicationId: string;
  type: string;
};

type THandler = (data: TData, actions: any) => void;

export type TSnapInputCheckout = {
  init(d: string): void;
  onInit: THandler;
  onClick: THandler;
  onApproved: THandler;
  onError: THandler;
};

export type TSnapCheckoutReturn = {
  _actions: {
    launchCheckout(t: any): void;
  };
  render: () => void;
};

type Snap = {
  render(): void;
  checkoutButton(input: TSnapInputCheckout): TSnapCheckoutReturn;
  checkoutMark(data: any): Snap;
  init(token: string): void;
};

declare global {
  interface Window {
    snap: Snap;
  }
}