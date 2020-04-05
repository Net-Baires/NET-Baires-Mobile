import React, { useEffect, useState } from "react";
import { store, persistor } from "app/store";
import { StatusBar } from "react-native";
import { BaseColor } from "@config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigation";
import { AuthProvider, AuthConsumer } from "./Context/AuthContext";

console.disableYellowBox = true;

const Index = () => {
  useEffect(() => {
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
  }, []);
  return (
    <AuthProvider>
      <AuthConsumer>
        {() => (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              
              <App />
            </PersistGate>
          </Provider>
        )}
      </AuthConsumer>
    </AuthProvider>
  );
};
export default Index;
