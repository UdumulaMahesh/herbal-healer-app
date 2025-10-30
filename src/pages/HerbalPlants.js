import React from "react";

const HerbalPlants = () => {
  // --- Removed all image imports and image: properties ---
  const herbCategories = [
    {
      title: "🌿 Culinary & Medicinal Herbs",
      herbs: [
        {
          name: "Basil (Ocimum basilicum)",
          description:
            "Beyond its use in Italian and Thai cuisine, basil can help with gas, lack of appetite, and minor cuts.",
        },
        {
          name: "Dill (Anethum graveolens)",
          description:
            "A citrus and anise-flavored herb that aids digestion and adds zest to salads and sauces.",
        },
        {
          name: "Fennel (Foeniculum vulgare)",
          description:
            "Fennel seeds aid digestion and pair perfectly with seafood and stuffings.",
        },
        {
          name: "Ginger (Zingiber officinale)",
          description:
            "A root remedy for nausea and motion sickness with anti-inflammatory properties.",
        },
        {
          name: "Mint (Mentha species)",
          description:
            "Used in drinks and desserts; soothes indigestion, nausea, and headaches.",
        },
        {
          name: "Oregano (Origanum vulgare)",
          description:
            "Rich in antioxidants and perfect for pizzas, pasta, and meats.",
        },
        {
          name: "Parsley (Petroselinum crispum)",
          description:
            "Nutrient-rich garnish used in salads, pestos, and sauces.",
        },
        {
          name: "Rosemary (Salvia rosmarinus)",
          description:
            "Fragrant herb for meats and breads; enhances memory and. focus.",
        },
        {
          name: "Sage (Salvia officinalis)",
          description:
            "Used in stuffings and meats; helps sore throats and digestion.",
        },
        {
          name: "Thyme (Thymus vulgaris)",
          description:
            "A versatile herb for soups and stews with antiseptic properties.",
        },
      ],
    },
    {
      title: "🌾 Ayurvedic & Traditional Herbs",
      herbs: [
        {
          name: "Ashwagandha (Withania somnifera)",
          description:
            "Adaptogenic herb used to manage stress, boost immunity, and enhance vitality.",
        },
        {
          name: "Brahmi (Bacopa monnieri)",
          description:
            "Used in Ayurveda to boost memory and reduce anxiety.",
        },
        {
          name: "Cumin (Cuminum cyminum)",
          description:
            "Aids digestion and adds earthy flavor to cuisines worldwide.",
        },
        {
          name: "Gotu Kola (Centella asiatica)",
          description:
            "Known as the 'herb of longevity', supports brain health and wound healing.",
        },
        {
          name: "Licorice Root (Glycyrrhiza glabra)",
          description:
            "Anti-inflammatory herb that soothes sore throats and digestive issues.",
        },
        {
          name: "Neem (Azadirachta indica)",
          description:
            "Known as the 'village dispensary'; antibacterial for skin and dental health.",
        },
        {
          name: "Shatavari (Asparagus racemosus)",
          description:
            "Promotes reproductive health and acts as a rejuvenating tonic.",
        },
        {
          name: "Tulsi (Ocimum sanctum)",
          description:
            "Holy basil revered for immunity and respiratory support.",
        },
        {
          name: "Turmeric (Curcuma longa)",
          description:
            "Powerful anti-inflammatory and antioxidant spice.",
        },
      ],
    },
    {
      title: "🌸 Other Significant Herbal Plants",
      herbs: [
        {
          name: "Arnica (Arnica montana)",
          description:
            "Used externally to reduce pain and inflammation from bruises and sprains.",
        },
        {
          name: "Echinacea (Echinacea purpurea)",
          description:
            "Boosts immunity and helps fight colds and infections.",
        },
        {
          name: "Lavender (Lavandula species)",
          description:
            "Aromatherapy favorite that reduces stress, anxiety, and insomnia.",
        },
        {
          name: "Marsh-mallow (Althaea officinalis)",
          description:
            "Used for stomach ulcers and inflammation relief.",
        },
        {
          name: "Milk Thistle (Silybum marianum)",
          description:
            "Traditionally used for liver health and detoxification.",
        },
        {
          name: "St. John’s Wort (Hypericum perforatum)",
          description:
            "Used for mild to moderate depression and mood balance.",
        },
        {
          name: "Valerian (Valeriana officinalis)",
          description:
            "Sedative herb used for better sleep and anxiety relief.",
        },
        {
          name: "Yarrow (Achillea millefolium)",
          description:
            "Astringent herb to heal wounds and stop bleeding.",
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ color: "#059669", fontWeight: "700", textAlign: "center", marginBottom: "2rem" }}>
        🌿 Herbal Plants
      </h1>
      {herbCategories.map((category, index) => (
        <div key={index} style={{ marginBottom: "3rem" }}>
          <h2 style={{ color: "#047857", marginBottom: "1rem", borderBottom: "2px solid #a7f3d0" }}>
            {category.title}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {category.herbs.map((herb, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#ecfdf5",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease-in-out",
                  padding: "1rem", // Added padding here since the image is gone
                }}
              >
                {/* --- Removed the <img> tag --- */}

                <div style={{ padding: "0" }}> {/* Removed padding from inner div */}
                  <h3 style={{ color: "#065f46", fontSize: "1rem", fontWeight: "600" }}>
                    {herb.name}
                  </h3>
                  <p style={{ color: "#374151", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    {herb.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HerbalPlants;