import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createCurrentCampaign } from "@/data/current-campaign";
import { startingData } from "@/data/starting-data";
import { stalkers } from "@/data/stalkers";

export default function NewCampaignScreen() {
  const router = useRouter();
  const [campaignName, setCampaignName] = useState("");
  const [step, setStep] = useState<"details" | "stalkers" | "resources">("details");
  const [selectedStalkerIds, setSelectedStalkerIds] = useState<string[]>([]);
  const zoneNavigationRoute: Href = "/zone-navigation" as Href;

  const trimmedCampaignName = campaignName.trim();
  const selectedStalkers = stalkers.filter((stalker) => selectedStalkerIds.includes(stalker.id));
  const startingArmor = startingData.equipment.find((equipment) => equipment.id === "leather-jacket");
  const startingAssignments = selectedStalkers.map((stalker) => ({
    stalkerId: stalker.id,
    stalkerName: stalker.name,
    armorName: startingArmor?.name ?? "No starting armor configured",
  }));

  const toggleStalker = (stalkerId: string) => {
    setSelectedStalkerIds((currentIds) =>
      currentIds.includes(stalkerId)
        ? currentIds.filter((id) => id !== stalkerId)
        : [...currentIds, stalkerId]
    );
  };

  const finishSetup = () => {
    if (trimmedCampaignName === "" || selectedStalkers.length === 0) return;

    createCurrentCampaign(trimmedCampaignName, selectedStalkers);
    router.push(zoneNavigationRoute);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.hazeOne} />
      <View pointerEvents="none" style={styles.hazeTwo} />
      <View pointerEvents="none" style={styles.grid} />

      <View style={styles.hero}>
        <Text style={styles.kicker}>
          {step === "details"
            ? "Campaign Setup"
            : step === "stalkers"
              ? "Roster Selection"
              : "Starting Resources"}
        </Text>
        <Text style={styles.title}>New Campaign</Text>
        <Text style={styles.subtitle}>
          {step === "details"
            ? "Start by naming this operation. We will use this as the foundation for the rest of the campaign setup flow."
            : step === "stalkers"
              ? "Choose the stalkers who will take part in this campaign. You can adjust the squad before we move on to later setup steps."
              : "Review the squad's starting gear and the shared campaign funds before we save this opening setup."}
        </Text>
      </View>

      <View style={styles.panel}>
        {step === "details" ? (
          <>
            <Text style={styles.label}>Campaign Name</Text>

            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={setCampaignName}
              placeholder="Enter campaign name"
              placeholderTextColor="#6f8078"
              returnKeyType="done"
              selectionColor="#7ea66a"
              style={styles.input}
              value={campaignName}
            />

            <View style={styles.previewBlock}>
              <Text style={styles.previewLabel}>Current Name</Text>
              <Text style={styles.previewValue}>
                {trimmedCampaignName === "" ? "No campaign name set yet." : trimmedCampaignName}
              </Text>
            </View>

            <Pressable
              disabled={trimmedCampaignName === ""}
              onPress={() => setStep("stalkers")}
              style={[styles.button, trimmedCampaignName === "" && styles.buttonDisabled]}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </>
        ) : step === "stalkers" ? (
          <>
            <View style={styles.selectionHeader}>
              <View>
                <Text style={styles.label}>Campaign</Text>
                <Text style={styles.campaignName}>{trimmedCampaignName}</Text>
              </View>

              <View style={styles.counterBadge}>
                <Text style={styles.counterText}>{selectedStalkerIds.length} selected</Text>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={styles.stalkerList}
              showsVerticalScrollIndicator={false}
              style={styles.scrollArea}>
              {stalkers.map((stalker) => {
                const isSelected = selectedStalkerIds.includes(stalker.id);

                return (
                  <Pressable
                    key={stalker.id}
                    onPress={() => toggleStalker(stalker.id)}
                    style={[styles.stalkerCard, isSelected && styles.stalkerCardSelected]}>
                    <View style={styles.stalkerCopy}>
                      <Text style={styles.stalkerName}>{stalker.name}</Text>
                      <Text style={styles.stalkerStats}>
                        HP {stalker.hp} · Shooting {stalker.shooting}
                      </Text>
                    </View>

                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                      <Text style={[styles.checkboxText, isSelected && styles.checkboxTextSelected]}>
                        {isSelected ? "Selected" : "Select"}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.previewBlock}>
              <Text style={styles.previewLabel}>Squad Preview</Text>
              <Text style={styles.previewValue}>
                {selectedStalkers.length === 0
                  ? "No stalkers chosen yet."
                  : selectedStalkers.map((stalker) => stalker.name).join(", ")}
              </Text>
            </View>

            <View style={styles.actionRow}>
              <Pressable onPress={() => setStep("details")} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Back</Text>
              </Pressable>

              <Pressable
                disabled={selectedStalkerIds.length === 0}
                onPress={() => setStep("resources")}
                style={[styles.button, styles.actionButton, selectedStalkerIds.length === 0 && styles.buttonDisabled]}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View style={styles.selectionHeader}>
              <View>
                <Text style={styles.label}>Campaign</Text>
                <Text style={styles.campaignName}>{trimmedCampaignName}</Text>
              </View>

              <View style={styles.counterBadge}>
                <Text style={styles.counterText}>{selectedStalkers.length} stalkers</Text>
              </View>
            </View>

            <View style={styles.previewBlock}>
              <Text style={styles.previewLabel}>Shared Group Funds</Text>
              <Text style={styles.previewValue}>{startingData.Koupons} K</Text>
            </View>

            <View style={styles.resourcesBlock}>
              <Text style={styles.previewLabel}>Starting Armor</Text>

              {startingAssignments.map((assignment) => (
                <View key={assignment.stalkerId} style={styles.resourceRow}>
                  <Text style={styles.resourceName}>{assignment.stalkerName}</Text>
                  <Text style={styles.resourceValue}>{assignment.armorName}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actionRow}>
              <Pressable onPress={() => setStep("stalkers")} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Back</Text>
              </Pressable>

              <Pressable onPress={finishSetup} style={[styles.button, styles.actionButton]}>
                <Text style={styles.buttonText}>Finish Setup</Text>
              </Pressable>
            </View>
          </>
        )}
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
    padding: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  selectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  label: {
    color: "#9db2a5",
    fontSize: 13,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  campaignName: {
    color: "#edf3ee",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  counterBadge: {
    backgroundColor: "rgba(126, 166, 106, 0.14)",
    borderColor: "#365142",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  counterText: {
    color: "#9db2a5",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#11181f",
    borderColor: "#22303a",
    borderRadius: 12,
    borderWidth: 1,
    color: "#edf3ee",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  scrollArea: {
    maxHeight: 280,
  },
  stalkerList: {
    gap: 10,
  },
  stalkerCard: {
    alignItems: "center",
    backgroundColor: "rgba(12, 17, 22, 0.8)",
    borderColor: "#22303a",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
  },
  stalkerCardSelected: {
    borderColor: "#7ea66a",
    backgroundColor: "rgba(126, 166, 106, 0.1)",
  },
  stalkerCopy: {
    flex: 1,
    paddingRight: 12,
  },
  stalkerName: {
    color: "#edf3ee",
    fontSize: 17,
    fontWeight: "600",
  },
  stalkerStats: {
    color: "#8b9992",
    fontSize: 13,
    marginTop: 4,
    letterSpacing: 1,
  },
  checkbox: {
    borderColor: "#365142",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  checkboxSelected: {
    backgroundColor: "#7ea66a",
    borderColor: "#7ea66a",
  },
  checkboxText: {
    color: "#9db2a5",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  checkboxTextSelected: {
    color: "#08100a",
  },
  previewBlock: {
    backgroundColor: "rgba(12, 17, 22, 0.8)",
    borderColor: "#22303a",
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 16,
    padding: 14,
  },
  previewLabel: {
    color: "#8b9992",
    fontSize: 12,
    letterSpacing: 1.2,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  previewValue: {
    color: "#edf3ee",
    fontSize: 16,
    lineHeight: 22,
  },
  resourcesBlock: {
    backgroundColor: "rgba(12, 17, 22, 0.8)",
    borderColor: "#22303a",
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 16,
    padding: 14,
  },
  resourceRow: {
    alignItems: "center",
    borderTopColor: "rgba(34, 48, 58, 0.9)",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  resourceName: {
    color: "#edf3ee",
    fontSize: 15,
    fontWeight: "600",
  },
  resourceValue: {
    color: "#9db2a5",
    fontSize: 14,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7ea66a",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  actionButton: {
    flex: 1,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: "#08100a",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: "#22303a",
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  secondaryButtonText: {
    color: "#9db2a5",
    fontSize: 14,
    fontWeight: "600",
  },
});
