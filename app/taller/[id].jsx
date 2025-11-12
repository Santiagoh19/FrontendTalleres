import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Image, Pressable, TextInput } from "react-native";
import { useLocalSearchParams, useRouter, useRootNavigationState } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";
import estilos from "../../assets/estilos/estilos";
import { api } from "../../assets/api";
import Boton from "../../assets/componentes/boton";
import { useAuth } from "../../assets/context/AuthContext";

export default function TallerDetalle() {
  const router = useRouter();
  const nav = useRootNavigationState();              // ✅ declarar ANTES de usarlo
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI local
  const [tab, setTab] = useState("desc");
  const [shareVisible, setShareVisible] = useState(false);
  const [opinionVisible, setOpinionVisible] = useState(false);
  const [toastGuardado, setToastGuardado] = useState(false);
  const [toastCompra, setToastCompra] = useState("");
  const okCompra = (m) => {
    setToastCompra(m);
    setTimeout(() => setToastCompra(""), 2200);
  };


  // ---- Opinión (estados) ----
  const [rate, setRate] = useState(0);
  const [coment, setComent] = useState("");

  // Galería
  const [galeriaOpen, setGaleriaOpen] = useState(false);
  const [galIndex, setGalIndex] = useState(0);

  // acordeones
  const [infoOpen, setInfoOpen] = useState(false);
  const [ubiOpen, setUbiOpen] = useState(false);
  const [matOpen, setMatOpen] = useState(false);



  useEffect(() => {
    let vivo = true;
    api
      .get(`/talleres/${id}`)
      .then((res) => vivo && setData(res.data?.data || null))
      .finally(() => vivo && setLoading(false));
    return () => { vivo = false; };
  }, [id]);

  // ---------- MEDIA ----------
  const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200";

  const imagenes = useMemo(() => {
    const arr = [];
    if (data?.imagen) arr.push(data.imagen);
    if (Array.isArray(data?.galeria)) arr.push(...data.galeria.filter(Boolean));
    return arr.length ? arr : [FALLBACK_IMG];
  }, [data]);

  const precioFmt = useMemo(
    () => new Intl.NumberFormat("es-CO").format(Number(data?.precio ?? 0)),
    [data?.precio]
  );

  //  redirección segura a login (solo si Root está listo)
  const goLogin = () => {
    if (!nav?.key) return; // espera a que el Root esté montado
    router.push({ pathname: "/auth/login", params: { redirect: `/taller/${id}` } });
  };

  // ---------- acciones ----------
  const onGuardar = async () => {
    try {
      if (!user) return goLogin();
      await api.post(`/me/save/${id}`);
      setToastGuardado(true);
      setTimeout(() => setToastGuardado(false), 2500);
    } catch {
      setToastGuardado(true);
      setTimeout(() => setToastGuardado(false), 2500);
    }
  };

  const onAdquirir = async () => {
  try {
    if (!user) return goLogin();
    const { data } = await api.post(`/me/acquire/${id}`);
    if (data?.status) {
      okCompra("¡Taller adquirido correctamente!");
      
    } else {
      okCompra("No se pudo adquirir");
    }
  } catch (e) {
    okCompra(e?.response?.data?.message || "No se pudo adquirir");
  }
};

  const onCopyLink = async () => {
    const slug = encodeURIComponent(String(id));
  
  const webBase = typeof window !== "undefined" ? window.location.origin : null;
  
  const url = webBase ? `${webBase}/taller/${slug}` : Linking.createURL(`/taller/${slug}`);

  await Clipboard.setStringAsync(url);
  setShareVisible(false);
  };

  if (loading) {
    return (
      <View style={[estilos.pantalla, { justifyContent: "center" }]}>
        <Text style={estilos.tallerParrafo}>Cargando…</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[estilos.pantalla, { justifyContent: "center" }]}>
        <Text style={{ color: "crimson" }}>Taller no encontrado</Text>
      </View>
    );
  }

  // navegación galería
  const openGaleria = (start = 0) => {
    setGalIndex(start);
    setGaleriaOpen(true);
  };
  const prevImg = () =>
    setGalIndex((i) => (i - 1 + imagenes.length) % imagenes.length);
  const nextImg = () => setGalIndex((i) => (i + 1) % imagenes.length);

  return (
    <View style={estilos.pantalla}>
      <ScrollView
        contentContainerStyle={estilos.scrollContenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={[estilos.contenedorBlanco, estilos.detalleContenedor]}>
          {/* Header */}
          <View style={estilos.tallerHeader}>
            <Pressable onPress={() => router.back()} style={estilos.tallerBack}>
              <Ionicons name="chevron-back" size={22} color="#0B4F6C" />
            </Pressable>

            <Text style={estilos.tallerTitulo}>{data.titulo}</Text>

            <View style={estilos.tallerAcciones}>
              <Pressable
                onPress={() => setOpinionVisible(true)}
                style={estilos.accionBtn}
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={16}
                  color="#0B4F6C"
                />
                <Text style={estilos.accionTxt}>Opinión</Text>
              </Pressable>
              <Pressable
                onPress={() => setShareVisible((v) => !v)}
                style={estilos.accionBtn}
              >
                <Ionicons
                  name="share-social-outline"
                  size={16}
                  color="#0B4F6C"
                />
                <Text style={estilos.accionTxt}>Compartir</Text>
              </Pressable>
              <Pressable onPress={onGuardar} style={estilos.accionBtn}>
                <Ionicons name="bookmark-outline" size={16} color="#0B4F6C" />
                <Text style={estilos.accionTxt}>Guardar</Text>
              </Pressable>
            </View>
          </View>

          {/* rating */}
          <View style={estilos.tallerRatingRow}>
            <Ionicons name="star" size={16} color="#F5C045" />
            <Text style={estilos.tallerRatingText}>
              {Number(data.rating || 0).toFixed(1)} ({data.votos || 0} votos)
            </Text>
          </View>

          {/* ====== media ====== */}
          <View style={estilos.tallerMediaRow}>
            {/* izquierda: imagen grande */}
            <Pressable onPress={() => openGaleria(0)} style={estilos.imgGrande}>
              <Image
                source={{ uri: imagenes[0] || FALLBACK_IMG }}
                style={estilos.imgFill}
                resizeMode="cover"
              />
              {/* Badge: icono + contador */}
              {imagenes.length > 1 && (
                <View style={estilos.imgBadge}>
                  <Ionicons name="images-outline" size={14} color="#fff" />
                  <Text style={estilos.imgBadgeText}>{imagenes.length}</Text>
                </View>
              )}
            </Pressable>

            {/* derecha: CTA */}
            <View style={estilos.tallerCtaSide}>
              <Boton
                texto={`Adquirir  •  $${precioFmt}`}
                variante="azul"
                funcion={onAdquirir}
              />
            </View>
          </View>

          {/* Tabs */}
          <View style={estilos.tallerTabs}>
            <Pressable
              onPress={() => setTab("desc")}
              style={[estilos.tabItem, tab === "desc" && estilos.tabItemActivo]}
            >
              <Text
                style={[estilos.tabTxt, tab === "desc" && estilos.tabTxtActivo]}
              >
                Descripción
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTab("tallerista")}
              style={[
                estilos.tabItem,
                tab === "tallerista" && estilos.tabItemActivo,
              ]}
            >
              <Text
                style={[
                  estilos.tabTxt,
                  tab === "tallerista" && estilos.tabTxtActivo,
                ]}
              >
                Tallerista
              </Text>
            </Pressable>
          </View>

          {tab === "desc" ? (
            <>
              <View style={estilos.tallerSeccion}>
                <Text style={estilos.tallerSubtitulo}>Acerca de</Text>
                <Text style={estilos.tallerParrafo}>
                  {data.descripcionLarga ||
                    "Espacio creativo y formativo para explorar fundamentos, significados y aplicaciones del color en distintos ámbitos visuales."}
                </Text>
              </View>

              {/* acordeones */}
              <View style={estilos.tallerAcordeones}>
                <View style={estilos.acordeonItem}>
                  <Pressable
                    onPress={() => setInfoOpen((v) => !v)}
                    style={estilos.acordeonHeader}
                  >
                    <Text style={estilos.acordeonTitulo}>Información</Text>
                    <Ionicons
                      name={infoOpen ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#0B4F6C"
                    />
                  </Pressable>
                  {infoOpen && (
                    <View style={estilos.acordeonBody}>
                      <Text style={estilos.tallerParrafo}>
                        Cupos: {data.cupos || "—"} • Inicio:{" "}
                        {data.fechaInicio || "—"}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={estilos.acordeonItem}>
                  <Pressable
                    onPress={() => setUbiOpen((v) => !v)}
                    style={estilos.acordeonHeader}
                  >
                    <Text style={estilos.acordeonTitulo}>Ubicación</Text>
                    <Ionicons
                      name={ubiOpen ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#0B4F6C"
                    />
                  </Pressable>
                  {ubiOpen && (
                    <View style={estilos.acordeonBody}>
                      <Text style={estilos.tallerParrafo}>
                        {data.ubicacion || "Por confirmar"}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={estilos.acordeonItem}>
                  <Pressable
                    onPress={() => setMatOpen((v) => !v)}
                    style={estilos.acordeonHeader}
                  >
                    <Text style={estilos.acordeonTitulo}>Materiales</Text>
                    <Ionicons
                      name={matOpen ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#0B4F6C"
                    />
                  </Pressable>
                  {matOpen && (
                    <View style={estilos.acordeonBody}>
                      <Text style={estilos.tallerParrafo}>
                        Se listarán aquí los materiales del taller.
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Opiniones demo */}
              <View style={estilos.tallerSeccion}>
                <Text style={estilos.tallerSubtitulo}>Opiniones</Text>
                <View style={estilos.opinionItem}>
                  <View style={estilos.opAvatar} />
                  <View style={{ flex: 1 }}>
                    <View style={estilos.opHeader}>
                      <Text style={estilos.opNombre}>Luis</Text>
                      <View style={estilos.opStars}>
                        <Ionicons name="star" size={14} color="#F5C045" />
                        <Text style={estilos.opTxt}>4.5</Text>
                      </View>
                    </View>
                    <Text style={estilos.opTxtSmall}>
                      “Fue una experiencia increíble… ¡lo recomiendo!”
                    </Text>
                    <Text style={estilos.opFecha}>23 de Octubre 2025</Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={estilos.tallerSeccion}>
              <Text style={estilos.tallerSubtitulo}>Tallerista</Text>
              <Text style={estilos.tallerParrafo}>
                {data.tallerista || "Tallerista por confirmar."}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Toast guardado */}
      {toastGuardado && (
        <View
          style={[
            estilos.toast,
            { top: 12, right: 12, backgroundColor: "#2FC33C", position: "absolute" },
          ]}
        >
          <Text style={estilos.toastTxt}>Se ha guardado correctamente</Text>
        </View>
      )}
      {/* Toast adquirido */}
{!!toastCompra && (
  <View
    style={[
      estilos.toast,
      { top: 56, right: 12, backgroundColor: "#2FC33C", position: "absolute" }
    ]}
  >
    <Ionicons name="checkmark-circle" size={16} color="#fff" />
    <Text style={estilos.toastTxt}>&nbsp;{toastCompra}</Text>
  </View>
)}


      {/* Panel compartir */}
      {shareVisible && (
        <View style={estilos.sharePanel}>
          <Text style={estilos.shareTitulo}>¡Comparte este taller!</Text>
          <Pressable onPress={onCopyLink} style={estilos.shareCopy}>
            <Ionicons name="copy-outline" size={16} color="#fff" />
            <Text style={estilos.shareCopyTxt}>Copiar link</Text>
          </Pressable>
          <View style={estilos.shareIconsRow}>
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Ionicons name="logo-instagram" size={20} color="#fff" />
            <Ionicons name="mail-outline" size={20} color="#fff" />
          </View>
          <Pressable onPress={() => setShareVisible(false)} style={estilos.shareClose}>
            <Ionicons name="close" size={16} color="#fff" />
          </Pressable>
        </View>
      )}

      {/* ======== OVERLAY OPINIÓN ======== */}
      {opinionVisible && (
        <View style={estilos.opOverlay}>
          <View style={estilos.opCard}>
            <View style={estilos.opCardHeader}>
              <Text style={estilos.opCardTitle}>
                Deja una opinión acerca de este taller
              </Text>
              <Pressable onPress={() => setOpinionVisible(false)}>
                <Ionicons name="close" size={18} color="#0B4F6C" />
              </Pressable>
            </View>

            <View style={estilos.opRateRow}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Pressable key={n} onPress={() => setRate(n)}>
                  <Ionicons
                    name={n <= rate ? "star" : "star-outline"}
                    size={22}
                    color="#F5C045"
                  />
                </Pressable>
              ))}
            </View>

            <TextInput
              style={estilos.opInput}
              multiline
              maxLength={500}
              value={coment}
              onChangeText={setComent}
              placeholder="Escribe tu comentario…"
              placeholderTextColor="#9DB7C5"
            />
            <Text style={estilos.opCount}>{coment.length}/500</Text>

            <Boton
              texto="Enviar"
              funcion={() => setOpinionVisible(false)}
              variante="azul"
            />
          </View>
        </View>
      )}

      {/* ======== GALERÍA OVERLAY ======== */}
      {galeriaOpen && (
        <View style={estilos.opOverlay}>
          <View style={estilos.galleryStage}>
            <Image
              source={{ uri: imagenes[galIndex] }}
              style={estilos.galleryImgContain}
              resizeMode="contain"
            />
            {imagenes.length > 1 && (
              <>
                <Pressable
                  style={[estilos.galleryArrow, estilos.galleryArrowLeft]}
                  onPress={prevImg}
                >
                  <Ionicons name="chevron-back" size={22} color="#fff" />
                </Pressable>
                <Pressable
                  style={[estilos.galleryArrow, estilos.galleryArrowRight]}
                  onPress={nextImg}
                >
                  <Ionicons name="chevron-forward" size={22} color="#fff" />
                </Pressable>
              </>
            )}
          </View>
          <Pressable
            style={estilos.galleryClose}
            onPress={() => setGaleriaOpen(false)}
          >
            <Ionicons name="close" size={22} color="#fff" />
          </Pressable>
        </View>
      )}
    </View>
  );
}
