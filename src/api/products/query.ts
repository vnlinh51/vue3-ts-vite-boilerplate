import {
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query";
import {
  addProductToCart,
  fetchCategories,
  fetchProduct,
  fetchProductDetails,
  fetchProductOfCategory,
  fetchUserCarts,
} from "./product";
import { IParams } from "@/types/product.types";

// export const useListProductsInfiniteQuery = () => {
//   return useInfiniteQuery(
//     "projects",
//     ({ pageParam: skip }) =>
//       fetchProduct({
//         limit: 10,
//         skip,
//       }),
//     {
//       getNextPageParam: (lastPage) => {
//         if (lastPage.skip + lastPage.limit >= lastPage.total) return undefined;

//         return lastPage.skip + lastPage.limit;
//       },
//       staleTime: 1000000,
//     }
//   );
// };

export const useListProductsInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 0 }) =>
      fetchProduct({
        limit: 10,
        skip: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.skip + lastPage.limit >= lastPage.total) return undefined;
      return lastPage.skip + lastPage.limit;
    },
    staleTime: 1000000,
    initialPageParam: 0,
  });
};

export const useProductsCategories = () => {
  return useQuery({
    queryKey:["products-categories"],
    queryFn: fetchCategories
  });
};

export const useGetProductsByCategory = (
  categoryId: string,
  params?: IParams,
  enabled?: boolean
) => {
  return useQuery({
    queryKey:["products-categories", categoryId],
    queryFn: () => fetchProductOfCategory(categoryId, params),
    enabled,
  });
};

export const useGetUserCarts = (userId: string | number) => {
  return useQuery({
    queryKey: ["user-carts"],
    queryFn: () => fetchUserCarts(userId),
    select: (data) => data.carts?.[0] ?? [],
  });
};

export const useGetProductDetails = (productId: string | number) => {
  return useQuery({
    queryKey: ["product-details", productId],
    queryFn: () => fetchProductDetails(productId),
  });
};

// export const useAddProductToCartMutation = () => {
//   return useMutation({
//     mutationFn: ["add-product-to-cart"],
//     ({
//       userId,
//       products,
//     }: {
//       userId: string | number;
//       products: { id: string | number; quantity: number }[];
//     }) => addProductToCart(userId, products)
//   });
// };

export const useAddProductToCartMutation = () => {
  return useMutation({
    mutationFn: ({ userId, products }: {
      userId: string | number;
      products: { id: string | number; quantity: number }[];
    }) => addProductToCart(userId, products),
  });
};