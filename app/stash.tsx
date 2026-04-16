import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentCampaign } from "@/data/current-campaign";

export default function StashScreen() {
  const router = useRouter();
  const campaign = getCurrentCampaign();
  const stash = campaign?.stash;

  return (
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.hazeOne} />
      <View pointerEvents="none" style={styles.hazeTwo} />
      <View pointerEvents="none" style={styles.grid} />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Squad Storage</Text>
        <Text style={styles.title}>Stash</Text>
        <Text style={styles.subtitle}>
          {campaign ? `${campaign.name} shared inventory and starting supplies.` : "No active campaign stash is available yet."}
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.sectionLabel}>Koupons</Text>
        <Text style={styles.value}>{stash?.money ?? 0} K</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.sectionLabel}>Armor</Text>
        {stash && stash.armor.length > 0 ? (
          stash.armor.map((entry) => (
            <View key={entry.id} style={styles.row}>
              <Text style={styles.rowName}>{entry.name}</Text>
              <Text style={styles.rowValue}>x{entry.quantity}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyState}>No armor in stash.</Text>
        )}
      </View>

      <Pressable onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
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
    fontSize: 30,
    fontWeight: "700",
  },
  subtitle: {
    color: "#a5b6ad",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 330,
  },
  panel: {
    backgroundColor: "rgba(17, 24, 31, 0.9)",
    borderColor: "#22303a",
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    padding: 18,
  },
  sectionLabel: {
    color: "#8b9992",
    fontSize: 12,
    letterSpacing: 1.4,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  value: {
    color: "#edf3ee",
    fontSize: 24,
    fontWeight: "700",
  },
  row: {
    alignItems: "center",
    borderTopColor: "rgba(34, 48, 58, 0.9)",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  rowName: {
    color: "#edf3ee",
    fontSize: 15,
    fontWeight: "600",
  },
  rowValue: {
    color: "#9db2a5",
    fontSize: 14,
  },
  emptyState: {
    color: "#6f8078",
    fontStyle: "italic",
  },
  button: {
    alignItems: "center",
    alignSelf: "flex-start",
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
});
