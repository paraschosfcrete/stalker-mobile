import { getCurrentCampaign } from "@/data/current-campaign";
import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ZoneNavigationScreen() {
  const router = useRouter();
  const campaign = getCurrentCampaign();
  const stashRoute: Href = "/stash" as Href;

  return (
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.hazeOne} />
      <View pointerEvents="none" style={styles.hazeTwo} />
      <View pointerEvents="none" style={styles.grid} />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Zone Navigation</Text>
        <Text style={styles.title}>{campaign?.name ?? "Zone Map"}</Text>
        <Text style={styles.subtitle}>
          The squad must pick a mission before doing anything else in the zone.
        </Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.sectionLabel}>Mission Step</Text>
            <Text style={styles.statusLabel}>Mission selection is required</Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable onPress={() => router.push(stashRoute)} style={styles.button}>
              <Text style={styles.buttonText}>Stash</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderTitle}>Please choose a mission</Text>

          <Pressable style={[styles.optionButton, styles.missionsButton]}>
            <Text style={styles.optionButtonText}>A1. Rescuing Dalik</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
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
    top: -30,
    right: -20,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(126, 166, 106, 0.12)",
  },
  hazeTwo: {
    position: "absolute",
    bottom: 50,
    left: -70,
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
    marginBottom: 24,
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
    fontSize: 30,
    fontWeight: "700",
  },
  subtitle: {
    color: "#a5b6ad",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 360,
  },
  panel: {
    backgroundColor: "rgba(17, 24, 31, 0.9)",
    borderColor: "#22303a",
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    padding: 18,
  },
  headerRow: {
    gap: 12,
    marginBottom: 16,
  },
  headerActions: {
    alignItems: "center",
    flexDirection: "row",
  },
  sectionLabel: {
    color: "#8b9992",
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  statusLabel: {
    color: "#6f8078",
    fontSize: 12,
    marginTop: 6,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7ea66a",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  buttonText: {
    color: "#08100a",
    fontSize: 14,
    fontWeight: "600",
  },
  placeholderCard: {
    backgroundColor: "#0b1014",
    borderColor: "#22303a",
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  placeholderTitle: {
    color: "#edf3ee",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
  },
  placeholderText: {
    color: "#a5b6ad",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  optionButton: {
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  missionsButton: {
    backgroundColor: "#a63a3a",
  },
  optionButtonText: {
    color: "#edf3ee",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
