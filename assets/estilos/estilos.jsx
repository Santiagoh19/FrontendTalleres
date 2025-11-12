import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  /* ====== PANTALLA / LAYOUT ====== */
  pantalla: {
    flex: 1,
    backgroundColor: "#EAF3FF",
    width: "100%",
    alignItems: "center",
  },

  
  contenedor: {
    width: "100%",
    alignItems: "center",
  },

  /* ====== BUSCADOR ====== */
  buscadorWrap: {
    marginTop: 26,
    width: 820,
    height: 48,
    borderRadius: 999,
    backgroundColor: "#01BAEF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  buscadorIcono: { marginRight: 4 },
  buscadorInput: { flex: 1, color: "#fff", fontSize: 16 },

  /* ====== FILTROS (chips) ====== */
  filtrosWrap: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: "#fff",
    borderColor: "#D6E6FF",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 10,
  },
  chipAzul: { borderColor: "#B3E9FA" },
  chipActivo: {
    backgroundColor: "#F0436A",
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  chipAzulActivo: { backgroundColor: "#01BAEF" },
  chipPressed: { transform: [{ scale: 0.98 }] },
  chipTexto: { color: "#0B4F6C", fontWeight: "600" },
  chipTextoActivo: { color: "#fff" },

  /* ====== SCROLL / CONTENEDOR ====== */
  scrollContenido: {
    alignItems: "center",
    paddingBottom: 40,
  },
  contenedorBlanco: {
    marginTop: 18,
    width: 1318,                 // ancho exacto para 4 columnas
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    paddingHorizontal: 30,       // padding lateral = gap
    paddingTop: 30,
  },

  /* ====== COLORES DE TEXTO REUTILIZABLES ====== */
  titleColor: { color: "#0B4F6C" },

  /* === DETALLE === */
  detalleOuter: {
    width: "100%",
    alignItems: "center",
  },
  detalleContenedor: {
    width: 980,
    paddingBottom: 30,
  },
  // para alinear el botón de adquirir a la derecha en el detalle
  detalleCompraBox: {
    alignSelf: "flex-end",
    marginTop: 8,
  },

  /* ====== GRID 4x4 ====== */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // deja 30px entre columnas
  },
  celda: {
    width: 292,
    marginBottom: 30, // separa filas (30px)
  },

  /* --- BOTÓN --- */
  boton: {
    borderRadius: 24,
    overflow: "hidden",
    alignSelf: "flex-start",
    minWidth: 160,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  botonMagenta: { backgroundColor: "#F0436A" },
  botonAzul: { backgroundColor: "#01BAEF" },
  botonFull: { alignSelf: "stretch" },
  botonDisabled: { opacity: 0.6 },

  botonPressable: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  botonContenido: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  textoPrecio: { fontWeight: "800" },

  /* --- TARJETA (292x429) --- */
  card: {
    width: 292,
    height: 429,
    backgroundColor: "#F0F6FF",
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  cardCover: { width: "100%", height: 190 },
  cardBody: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 6,
    flex: 1,
  },

  cardTitle: { color: "#0B4F6C", fontSize: 16.5, fontWeight: "700" },
  cardDesc: { color: "#799EAE", fontSize: 13, lineHeight: 18 },

  cardMetaRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardMetaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardMetaText: { color: "#3C7289", fontSize: 12.5 },

  cardCtaRow: { marginTop: "auto",
  alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%", },

  /* ===== DETALLE TALLER ===== */
  tallerWrap: {
    width: 980,
    paddingBottom: 40,
  },
  tallerHeader: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  tallerBack: { padding: 6, borderRadius: 8 },
  tallerTitulo: {
    flex: 1,
    textAlign: "left",
    fontSize: 26,
    fontWeight: "800",
    color: "#0B4F6C",
  },

  tallerAcciones: { flexDirection: "row", alignItems: "center", gap: 14 },
  accionBtn: { flexDirection: "row", alignItems: "center", gap: 6, padding: 6, borderRadius: 10 },
  accionTxt: { color: "#0B4F6C", fontWeight: "600" },
  accionIconColor: { color: "#0B4F6C" },

  tallerRatingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6, marginBottom: 12 },
  tallerRatingText: { color: "#3C7289", fontWeight: "700" },

  tallerMediaRow: {
  marginTop: 8,
  width: "100%",
  flexDirection: "row",     // <-- 2 columnas
  alignItems: "flex-start",
  gap: 16,
  },

  imgGrande: {
  width: 560,                
  height: 300,
  borderRadius: 16,
  overflow: "hidden",
  borderWidth: 2,
  borderColor: "#01BAEF",
  position: "relative",      
  },

  
  imgChica: { width: 220, height: 142, borderRadius: 16, borderWidth: 1, borderColor: "#DCECF8" },
  imgFill: { width: "100%", height: "100%" },
  imgBadge: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(0,0,0,0.48)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  imgBadgeText: { color: "#fff", fontWeight: "700" },

  tallerCtaSide: {
    marginLeft: "auto",
    alignItems: "flex-end",
    width: 260,
    justifyContent: "flex-start",
  },

  tallerTabs: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#DDEAF5",
  },
  tabItem: { paddingVertical: 10, paddingHorizontal: 14, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  tabItemActivo: { backgroundColor: "#F0F6FF", borderBottomWidth: 3, borderBottomColor: "#01BAEF" },
  tabTxt: { color: "#3C7289", fontWeight: "600" },
  tabTxtActivo: { color: "#0B4F6C", fontWeight: "800" },

  tallerSeccion: { marginTop: 14 },
  tallerSubtitulo: { color: "#0B4F6C", fontWeight: "800", marginBottom: 6, fontSize: 14 },
  tallerParrafo: { color: "#3C7289", lineHeight: 20 },

  tallerAcordeones: { marginTop: 10, gap: 10 },
  acordeonItem: { backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: "#E4EEF6" },
  acordeonHeader: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  acordeonTitulo: { color: "#0B4F6C", fontWeight: "700" },
  acordeonBody: { paddingHorizontal: 12, paddingBottom: 12 },

  /* Opiniones demo */
  opinionItem: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E8F0F7",
  },
  opAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#D9E7F2" },
  opHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  opNombre: { color: "#0B4F6C", fontWeight: "800" },
  opStars: { flexDirection: "row", gap: 6, alignItems: "center" },
  opTxt: { color: "#3C7289", fontWeight: "700" },
  opTxtSmall: { color: "#3C7289" },
  opFecha: { color: "#9DB7C5", marginTop: 4 },

  /* Toast guardado */
  toast: {
    position: "absolute",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  toastTxt: { color: "#fff", fontWeight: "800" },

  /* Share panel (debajo de acciones) */
  sharePanel: {
    position: "absolute",
    top: 84,
    right: 24,
    backgroundColor: "#01BAEF",
    borderRadius: 14,
    padding: 14,
    zIndex: 900,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    minWidth: 240,
  },
  shareTitulo: { color: "#fff", fontWeight: "800", marginBottom: 8 },
  shareCopy: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  shareCopyTxt: { color: "#fff", fontWeight: "700" },
  shareIconsRow: { flexDirection: "row", gap: 14, marginTop: 10 },
  shareClose: { position: "absolute", top: 8, right: 8, padding: 6 },

  /* Opinión overlay */
  opOverlay: {
  position: "absolute",
  top: 0, left: 0, right: 0, bottom: 0,   // <-- en RN Web es más confiable que "inset"
  backgroundColor: "rgba(0,0,0,0.35)",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  zIndex: 950,
  },
  opCard: { width: 520, backgroundColor: "#fff", borderRadius: 16, padding: 16 },
  opCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  opCardTitle: { color: "#0B4F6C", fontWeight: "800", fontSize: 16 },
  opRateRow: { flexDirection: "row", alignItems: "center", gap: 2, marginVertical: 8 },
  opInput: {
    height: 100,
    borderWidth: 1,
    borderColor: "#DCECF8",
    borderRadius: 10,
    padding: 10,
    color: "#0B4F6C",
    backgroundColor: "#FAFDFF",
  },
  opCount: { alignSelf: "flex-end", color: "#9DB7C5", marginVertical: 6 },

  /* Badge ya lo tienes (imgBadge / imgBadgeText) */

/* Galería nueva (overlay) */
galleryStage: {
  width: 880,       // ← tamaño fijo deseado
  height: 560,
  backgroundColor: "rgba(0,0,0,0.9)",
  borderRadius: 12,
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  padding: 6,
},
galleryImgContain: { width: "100%", height: "100%" },

galleryArrow: {
  position: "absolute",
  top: "50%",
  transform: [{ translateY: -22 }],
  backgroundColor: "rgba(255,255,255,0.18)",
  padding: 8,
  borderRadius: 999,
},
galleryArrowLeft: { left: 10 },
galleryArrowRight: { right: 10 },


  /* ===== NAV BAR ===== */
  navBar: {
    height: 60,
    backgroundColor: "#2F3437",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },
  navLeft: { paddingVertical: 8, paddingRight: 12 },
  navBrand: { color: "#fff", fontWeight: "800", fontSize: 16, letterSpacing: 0.3 },
  navCenter: { flexDirection: "row", alignItems: "center", gap: 6 },
  navLink: { color: "#fff", fontWeight: "600" },
  navRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  navCtas: { flexDirection: "row", gap: 10 },
  navBtn: { borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14 },
  navBtnOutline: { borderWidth: 1, borderColor: "#ffffff", backgroundColor: "transparent" },
  navBtnOutlineTxt: { color: "#ffffff", fontWeight: "700" },
  navBtnFill: { backgroundColor: "#F0436A" },
  navBtnFillTxt: { color: "#ffffff", fontWeight: "800" },
  navUserBtn: { padding: 6 },

  /* ===== PANTALLAS AUTH ===== */
  authCard: {
    width: 560,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginTop: 18,
  },
  authTitle: { color: "#0B4F6C", fontWeight: "900", fontSize: 22, marginBottom: 8 },
  inputLabel: { color: "#0B4F6C", fontWeight: "800", marginTop: 10, marginBottom: 6 },
  authInput: {
    flex: 1,
    backgroundColor: "#F0F6FF",
    borderWidth: 1,
    borderColor: "#CFE1F2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#0B4F6C",
  },
  inputIconRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  authUnderline: {
    color: "#0B4F6C",
    textDecorationLine: "underline",
    fontWeight: "700",
  },

  

/* ===== PERFIL ===== */
perfilCont: {
  width: 980,
  paddingBottom: 24,
},

perfilHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#F6FAFF",
  borderRadius: 18,
  padding: 14,
  borderWidth: 1,
  borderColor: "#E4EEF6",
  position: "relative",
  zIndex: 20,
},

perfilHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
perfilAvatar: {
  width: 56, height: 56, borderRadius: 28,
  backgroundColor: "#D9E7F2",
  borderWidth: 2, borderColor: "#CFE1F2",
},
perfilUserInfo: { gap: 2 },
perfilNombre: { color: "#0B4F6C", fontWeight: "800", fontSize: 16 },
perfilHandle: { color: "#3C7289", fontWeight: "600" },
perfilLocRow: { flexDirection: "row", alignItems: "center", gap: 4 },
perfilLocTxt: { color: "#3C7289" },

perfilGearBtn: {
  backgroundColor: "#fff",
  borderRadius: 10,
  paddingVertical: 8, paddingHorizontal: 10,
  borderWidth: 1, borderColor: "#E4EEF6",
},

perfilGearWrap: {
  position: "relative",
  zIndex: 30,       // asegura que este bloque esté por encima de los tabs
},

perfilGearMenu: {
  position: "absolute",
  top: 36,
  right: 0,
  backgroundColor: "#fff",
  borderRadius: 12,
  paddingVertical: 8,
  minWidth: 200,
  zIndex: 2000,
  shadowColor: "#000",
  shadowOpacity: 0.18,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },
  borderWidth: 1,
  borderColor: "#E7F0FA",
  elevation: 8, 
},
perfilMenuItem: { paddingVertical: 10, paddingHorizontal: 12 },
perfilMenuTxt: { color: "#0B4F6C", fontWeight: "700" },
perfilMenuDanger: { backgroundColor: "#F0436A", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },

perfilTabs: {
  flexDirection: "row",
  gap: 16,
  marginTop: 12,
  borderBottomWidth: 1, borderBottomColor: "#DDEAF5",
  paddingBottom: 6,
  zIndex: 1, 
},
perfilTab: { color: "#3C7289", fontWeight: "700" },
perfilTabActivo: { color: "#0B4F6C", fontWeight: "900" },

perfilSection: { marginTop: 16 },
perfilSectionTitle: { color: "#0B4F6C", fontWeight: "900", marginBottom: 10, fontSize: 15 },


/* ===== Editar Perfil ===== */
editWrap: { padding: 0 },
editGrid: { flexDirection: "row", gap: 24 },
editSide: { width: 220, paddingTop: 6 },
sideTitle: { color: "#0B4F6C", fontWeight: "900", marginBottom: 8 },
sideGroup: { color: "#0B4F6C", fontWeight: "800", marginTop: 14, marginBottom: 4 },
sideItem: { color: "#3C7289", fontWeight: "700", paddingVertical: 6 },
sideItemActive: { color: "#0B4F6C" },

contenedorBlancoPadBottom: {
  paddingBottom: 30,   // mismo valor que paddingTop
},

editMain: { flex: 1, gap: 18 },
panel: {
  backgroundColor: "#fff",
  borderRadius: 16,
  borderWidth: 1, borderColor: "#E4EEF6",
  padding: 16,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
},
panelTitle: { color: "#0B4F6C", fontWeight: "900", marginBottom: 10 },

editRow: { flexDirection: "row", alignItems: "center", gap: 12 },
label: { color: "#0B4F6C", fontWeight: "800", marginTop: 6, marginBottom: 4 },

input: {
  borderWidth: 1, borderColor: "#DDEAF5",
  borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10,
  color: "#0B4F6C", backgroundColor: "#F6FAFF",
},
inputWide: { width: 300 },

avatarLg: {
  width: 96, height: 96, borderRadius: 48,
  backgroundColor: "#D9E7F2",
  borderWidth: 2, borderColor: "#CFE1F2",
},

saveBtn: { alignSelf: "flex-start", marginTop: 10 },

/* Toast OK (arriba-derecha) */
toastOk: {
  position: "absolute",
  top: 12,
  right: 12,
  backgroundColor: "#2FC33C",
  flexDirection: "row",
  alignItems: "center"
},

 perfilAvatarImg: {
   width: 56,
   height: 56,
   borderRadius: 28,
   borderWidth: 2,
   borderColor: "#CFE1F2",
   backgroundColor: "#D9E7F2",
 },

 navAvatar: {
   width: 28,
   height: 28,
   borderRadius: 14,
   borderWidth: 1,
   borderColor: "#fff",
 },
 saveBtnInner: {
  paddingVertical: 10,   // intermedio (antes 0 vs 12)
  paddingHorizontal: 18, // intermedio (antes 0 vs 20)
  alignItems: "center",
  justifyContent: "center",
},

  temaIndex: {
    color: "#0B4F6C",
    fontWeight: "900",
  },
  temaIndexDone: {
    color: "#2FC33C",
  },
  claseDoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },

});

export default estilos;
