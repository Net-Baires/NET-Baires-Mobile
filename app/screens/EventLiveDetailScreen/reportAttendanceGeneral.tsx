import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Text, Button } from "@components";
import styles from "./styles";
import { reportAttendanceGeneralByCode } from "app/services/eventsServices";
import { toastError, toastSuccessful } from "app/services/toastServices";
import { EventLiveDetail } from "models/EventLiveDetail";
import QRCode from "react-native-qrcode-svg";
interface IncomingProps {
  eventLiveDetail: EventLiveDetail;
  eventUpdate: () => void;
}
type ReportAttendanceGeneralProps = IncomingProps;
const ReportAttendanceGeneral: React.SFC<IncomingProps> = ({
  eventLiveDetail,
  eventUpdate
}) => {
  const [
    reportAttendanceGeneralCode,
    setReportAttendanceGeneralCode
  ] = useState("");
  const [
    reportAttendanceGeneralCodeSuccess,
    setReportAttendanceGeneralCodeSuccess
  ] = useState(true);
  const [loading, setLoading] = useState(false);
  const reportAttendanceGeneral = () => {
    setLoading(true);
    reportAttendanceGeneralByCode(
      eventLiveDetail.id,
      reportAttendanceGeneralCode
    )
      .then(() => {
        toastSuccessful("Bienvenido al evento de NET-Baires");
        eventUpdate();
        setLoading(false);
      })
      .catch(e => {
        toastError("El código ingresado es incorrecto.");
        setLoading(false);
        setReportAttendanceGeneralCodeSuccess(false);
      });
  };
  return (
    <>
      {!eventLiveDetail.attended && (
        <>
          <View style={styles.blockView}>
            <Text headline semibold>
              Reportar asistencia
            </Text>
            <Text body2 style={{ marginTop: 5 }}>
              Cotanos que veniste, para quedar en contacto con todo el resto de
              asistentes.
            </Text>
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  marginTop: 10,
                  color: reportAttendanceGeneralCodeSuccess
                    ? BaseColor.grayColor
                    : BaseColor.primaryColor
                }
              ]}
              value={reportAttendanceGeneralCode}
              onChangeText={text => {
                setReportAttendanceGeneralCode(text);
                setReportAttendanceGeneralCodeSuccess(true);
              }}
              autoCorrect={false}
              placeholder="Código de asistencia"
              selectionColor={BaseColor.primaryColor}
              placeholderTextColor={
                reportAttendanceGeneralCodeSuccess
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
            />
            <Button
              loading={loading}
              full
              onPress={reportAttendanceGeneral}
              style={{ marginTop: 10 }}
            >
              Anunciarme
            </Button>
          </View>
          <View style={styles.blockView}>
            <Text headline semibold>
              Qr Asistencia
            </Text>
            <QRCode
              size={370}
              value={eventLiveDetail.tokenToReportMyAttendance}
            />
          </View>
        </>
      )}
    </>
  );
};
export default ReportAttendanceGeneral;
