import React from "react";

export default function TxHashLink({ hash }) {
  if (!hash) {
    return <></>;
  }
  return (
    <a
      target="_blank"
      style={{ marginTop: "4px", textDecoration: "underline", display: "block" }}
      href={"https://nile.tronscan.org/#/transaction/" + hash}
      rel="noreferrer"
    >
      {hash}
    </a>
  );
}
