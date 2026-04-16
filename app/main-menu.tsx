import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MainMenu() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.hazeOne} />
      <View pointerEvents="none" style={styles.hazeTwo} />
      <View pointerEvents="none" style={styles.grid} />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Zone Operations Console</Text>
        <Text style={styles.title}>S.T.A.L.K.E.R</Text>
        <Text style={styles.subtitle}>
          Track crews, prepare expeditions, and manage campaign progress from a hardened field terminal.
        </Text>
      </View>

      <View style={styles.menuCard}>
        <Text style={styles.sectionLabel}>Main Menu</Text>

        <View style={styles.buttonGroup}>
          <Pressable onPress={() => router.push("/new-campaign" as any)} style={styles.button}>
          <Text style={styles.buttonText}>New Campaign</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/load-game" as any)} style={styles.button}>
            <Text style={styles.buttonText}>Load Game</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c1116",
    overflow: "hidden",
    padding: 28,
    paddingTop: 72,
  },
  hazeOne: {
    position: "absolute",
    top: -40,
    right: -10,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(126, 166, 106, 0.12)",
  },
  hazeTwo: {
    position: "absolute",
    bottom: 80,
    left: -60,
    width: 240,
    height: 240,
    borderRadius: 999,
    backgroundColor: "rgba(150, 92, 47, 0.12)",
  },
  grid: {
    position: "absolute",
    inset: 0,
    borderColor: "rgba(157, 178, 165, 0.05)",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    margin: 20,
  },
  hero: {
    marginBottom: 28,
  },
  kicker: {
    color: "#7ea66a",
    fontSize: 12,
    letterSpacing: 1.6,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  title: {
    color: "#edf3ee",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    color: "#a5b6ad",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 320,
  },
  menuCard: {
    backgroundColor: "rgba(17, 24, 31, 0.88)",
    borderColor: "#22303a",
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  sectionLabel: {
    color: "#8b9992",
    fontSize: 12,
    letterSpacing: 1.4,
    marginBottom: 14,
    textTransform: "uppercase",
  },
  buttonGroup: {
    gap: 10,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#7ea66a",
    borderRadius: 999,
    width: 128,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  buttonText: {
    color: "#08100a",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
