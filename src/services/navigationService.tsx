import {
  CommonActions,
  createNavigationContainerRef,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: object): void {
  if (navigationRef?.isReady()) {
    navigationRef?.dispatch(CommonActions.navigate(name, params));
  }
}

export function goBack(): void {
  if (navigationRef?.canGoBack()) {
    navigationRef?.goBack();
  }
}

export function reset(name: string, params?: any): void {
  navigationRef?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name, params}],
    }),
  );
}

export function push(name: string, params?: object): void {
  navigationRef?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params?: object): void {
  navigationRef?.dispatch(StackActions.replace(name, params));
}

export function popToTop(): void {
  navigationRef?.dispatch(StackActions.popToTop());
}

export function toggleDrawer(): void {
  navigationRef?.dispatch(DrawerActions.toggleDrawer());
}
