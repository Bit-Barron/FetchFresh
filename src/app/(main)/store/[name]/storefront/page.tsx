"use client";

import React from "react";
import Sidebar from "@/components/elements/sidebar/sidebar";
import { MobileSidebar } from "@/components/elements/sidebar/mobile-sidebar";
import { Attributes } from "@/types/product";
import { Toaster } from "sonner";
import ProductList from "@/components/elements/frontpage/frontpage-product-list";
import PaginationComponent from "@/components/elements/frontpage/frontpage-pagination";
import StorePageHeader from "@/components/elements/frontpage/frontpage-header";
import { useStorePage } from "@/components/elements/frontpage/frontpage";

interface StorePageProps {
  params: { name: string };
}

export default function StorePage({ params }: StorePageProps) {
  const {
    selectedCategory,
    sorting,
    filterAttribute,
    setSorting,
    setFilterAttribute,
    products,
    categoryQuery,
    page,
    productsPerPage,
    attributeFilter,
    setAttributeFilter,
    totalPages,
    isLoading,
    setPage,
    setProductsPerPage,
    handleCategoryClick,
    addToCartHandler,
    removeFromCartHandler,
  } = useStorePage(params);

  if (params.name !== "rewe") {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster richColors position="top-right" />
      <div className="flex flex-1">
        <Sidebar
          categories={categoryQuery.data?.topLevelCategories || []}
          onCategoryClick={handleCategoryClick}
        />
        <MobileSidebar
          categories={categoryQuery.data?.topLevelCategories || []}
          onCategoryClick={handleCategoryClick}
        />
        <main className="flex-1 space-y-8 bg-[#F6F7F8] p-4 md:p-6">
          <section>
            <StorePageHeader
              selectedCategory={selectedCategory}
              sorting={sorting}
              filterAttribute={filterAttribute as keyof Attributes}
              productsPerPage={productsPerPage}
              setSorting={setSorting}
              setFilterAttribute={setFilterAttribute}
              setProductsPerPage={setProductsPerPage}
              products={products}
              attributeFilter={attributeFilter}
              setAttributeFilter={setAttributeFilter}
            />
            <ProductList
              products={products}
              isLoading={isLoading}
              filterAttribute={filterAttribute}
              attributeFilter={attributeFilter}
              addToCart={addToCartHandler}
              isInCart={function (id: number): boolean {
                throw new Error("Function not implemented.");
              }}
              removeFromCart={removeFromCartHandler}
            />
          </section>
        </main>
      </div>
      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
